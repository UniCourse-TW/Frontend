<script lang="ts" setup>
import type { PostMeta } from "../../types";
import { get_latest_post } from "../../api";
import SearchBar from "../../components/SearchBar.vue";
useHead({ title: "論壇 | UniCourse" });

const router = useRouter();

const query_body = ref("");
const latest_questions = reactive(<PostMeta[]>[]);
const latest_posts = reactive(<PostMeta[]>[]);
const is_fetching = ref(true);

get_latest_post()
    .then((meta) => {
        latest_questions.splice(0, latest_questions.length, ...meta.filter((m) => m.type === "question"));
        latest_posts.splice(0, latest_posts.length, ...meta.filter((m) => m.type !== "question"));
    })
    .catch(console.error)
    .finally(() => {
        is_fetching.value = false;
    });

function query() {
    router.push({ path: "/forum/search", query: { q: query_body.value } });
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
        }, idx * (latest_posts.length < 300 ? 50 : 1500 / latest_posts.length));
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
        <SearchBar v-model="query_body" :search="query" placeholder="搜尋文章及提問" />

        <div class="m-auto flex w-full max-w-[1200px] p-4">
            <div class="flex-1 px-4">
                <h2 class="text-lg lg:text-xl">最新文章</h2>
                <div class="w-full">
                    <transition-group
                        name="course-list"
                        :css="false"
                        @before-enter="course_animation.before_enter"
                        @enter="course_animation.enter"
                        @leave="course_animation.leave"
                    >
                        <div
                            v-show="latest_posts.length"
                            v-for="(meta, idx) of latest_posts"
                            :key="meta.id"
                            :data-idx="idx"
                            class="p2 m-auto flex w-full max-w-[1400px] items-center justify-center sm:p-4 lg:p-6"
                        >
                            <ForumMetaCard :meta="meta" />
                        </div>
                    </transition-group>
                    <div v-if="is_fetching">loading...</div>
                </div>
            </div>
            <div class="flex-1 px-4 lg:border-l-2 lg:border-l-blue-200">
                <h2 class="text-lg lg:text-xl">即時提問</h2>
                <div class="w-full">
                    <transition-group
                        name="course-list"
                        :css="false"
                        @before-enter="course_animation.before_enter"
                        @enter="course_animation.enter"
                        @leave="course_animation.leave"
                    >
                        <div
                            v-show="latest_questions.length"
                            v-for="(meta, idx) of latest_questions"
                            :key="meta.id"
                            :data-idx="idx"
                            class="p2 m-auto flex w-full max-w-[1400px] items-center justify-center sm:p-4 lg:p-6"
                        >
                            <ForumMetaCard :meta="meta" />
                        </div>
                    </transition-group>
                    <div v-if="is_fetching">loading...</div>
                </div>
            </div>
        </div>
    </div>
</template>
