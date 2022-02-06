<script lang="ts" setup>
import type { CourseInfo, CourseMeta } from "../../types";
import { courses } from "../../api";
import SearchBar from "../../components/SearchBar.vue";

useHead({ title: "課程查詢 | UniCourse" });

const query_body = ref("");
const query_results = reactive(<CourseMeta[]>[]);
const locked = ref(false);
const first = ref(true);
const adv = ref(false);
const detail_course = ref(<CourseInfo>{});

function rand_placeholder(): string {
    const holders = ["紀博文", "資工系", "程式設計", "UI", "本部", "週四"];
    return holders[Math.floor(Math.random() * holders.length)];
}

async function query() {
    if (locked.value) return;
    locked.value = true;
    try {
        const metae = await courses.list({ q: query_body.value, limit: 100, offset: 0, sort: "default", desc: false });
        query_results.splice(0, query_results.length, ...metae);
    } catch (e) {
        console.error(e);
    } finally {
        locked.value = false;
        first.value = false;
    }
}

async function show(key: string) {
    detail_course.value = await courses.info(key);
}

/**
 * Animations for course card list
 */
const course_animation = {
    before_enter(el: Element) {
        const elm = el as HTMLElement;
        elm.style.opacity = "0";
        elm.style.top = "-2rem";
        elm.style.transition = "all 0.25s";
    },
    enter(el: Element, done: () => void) {
        const elm = el as HTMLElement;
        const idx = +(elm.dataset.idx || "0");
        setTimeout(() => {
            elm.style.opacity = "1";
            elm.style.top = "0";
            setTimeout(done, 250);
        }, idx * (query_results.length < 300 ? 50 : 1500 / query_results.length));
    },
    leave(el: Element, done: () => void) {
        const elm = el as HTMLElement;
        elm.style.opacity = "0";
        setTimeout(done, 50);
    },
};
</script>

<template>
    <div>
        <div>
            <SearchBar
                v-model="query_body"
                :search="query"
                :advanced="() => (adv = !adv)"
                :placeholder="'搜尋課程 試試「' + rand_placeholder() + '」？'"
            />

            <div v-if="adv" class="flex justify-center px-6 lg:px-10">
                <div class="w-11/12">進階選項</div>
            </div>

            <div class="w-full">
                <transition-group
                    name="course-list"
                    :css="false"
                    @before-enter="course_animation.before_enter"
                    @enter="course_animation.enter"
                    @leave="course_animation.leave"
                >
                    <div
                        v-show="query_results.length"
                        v-for="(meta, idx) of query_results"
                        :key="[meta.year, meta.term, meta.serial].join('-')"
                        :data-idx="idx"
                        class="p2 m-auto flex w-full max-w-[1400px] cursor-pointer items-center justify-center sm:p-4 lg:p-6"
                        @click="show([meta.year, meta.term, meta.serial].join('-'))"
                    >
                        <MetaCard v-bind="meta" />
                    </div>
                </transition-group>
                <div
                    v-show="query_results.length === 0 && !first"
                    class="p2 m-auto flex w-full max-w-[1400px] items-center justify-center sm:p-4 lg:p-6"
                >
                    <div class="h-40 w-full rounded border border-gray-400 bg-white p-4 sm:p-5 lg:p-6">
                        <div>查無結果，請換個關鍵字試試？</div>
                    </div>
                </div>
            </div>
        </div>
        <transition name="detail">
            <div v-if="detail_course && detail_course.name" class="fixed top-0 left-0 h-screen w-screen pt-2 sm:px-2 lg:px-4">
                <FullScreenCard v-bind="(detail_course as any)" class="h-full w-full rounded-t-lg sm:rounded-t-xl" />
            </div>
        </transition>
    </div>
</template>
