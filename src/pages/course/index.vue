<script lang="ts" setup>
import type { CourseMeta } from "../../types";
import { get_course_meta } from "../../api";
import SearchBar from "../../components/SearchBar.vue";
useHead({ title: "課程查詢 | UniCourse" });

const query_body = ref("");
const query_results = reactive(<CourseMeta[]>[]);
const locked = ref(false);
const first = ref(true);
const adv = ref(false);

function rand_placeholder(): string {
    const holders = ["紀博文", "資工系", "程式設計", "UI", "本部", "週四"];
    return holders[Math.floor(Math.random() * holders.length)];
}

async function query() {
    if (locked.value) return;
    locked.value = true;
    try {
        const metae = await get_course_meta(query_body.value);
        query_results.splice(0, query_results.length, ...metae);
    } catch (e) {
        console.error(e);
    } finally {
        locked.value = false;
        first.value = false;
    }
}

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
                    class="p2 m-auto flex w-full max-w-[1400px] items-center justify-center sm:p-4 lg:p-6"
                >
                    <MetaCard :meta="meta" />
                </div>
            </transition-group>
            <div
                v-show="query_results.length === 0 && !first"
                class="p2 m-auto flex w-full max-w-[1400px] items-center justify-center sm:p-4 lg:p-6"
            >
                <div class="h-40 w-full cursor-pointer rounded border border-gray-400 bg-white p-4 sm:p-5 lg:p-6">
                    <div>查無結果，請換個關鍵字試試？</div>
                </div>
            </div>
        </div>
    </div>
</template>
