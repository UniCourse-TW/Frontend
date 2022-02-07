<script lang="ts" setup>
import type { PostMeta } from "../../types";
import { posts } from "../../api";
import SearchBar from "../../components/SearchBar.vue";
useHead({ title: "論壇 | UniCourse" });

const router = useRouter();

const query_body = ref("");
const latest_questions = reactive(<PostMeta[]>[]);
const latest_posts = reactive(<PostMeta[]>[]);
const is_fetching = ref(true);

posts
    .get_latest()
    .then((data) => {
        latest_questions.splice(0, latest_questions.length, ...data.filter((e) => e.type === "question"));
        latest_posts.splice(0, latest_posts.length, ...data.filter((e) => e.type !== "question"));
    })
    .catch(console.error)
    .finally(() => {
        // for demo purpose, temporarily extend the duration of loading
        setTimeout(() => (is_fetching.value = false), 1000);
        // is_fetching.value = false;
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

        <div class="m-auto grid max-w-[1200px] grid-cols-1 gap-y-8 px-4 lg:grid-cols-2 lg:divide-x-2 lg:divide-blue-200">
            <div class="px-4 lg:px-6">
                <h2 class="text-lg lg:text-xl">最新文章</h2>
                <div class="w-full">
                    <transition-group
                        name="course-list"
                        :css="false"
                        @before-enter="course_animation.before_enter"
                        @enter="course_animation.enter"
                        @leave="course_animation.leave"
                    >
                        <div v-if="is_fetching" class="my-4"><ForumMetaCard is_loading /></div>
                        <div
                            v-else-if="latest_posts.length"
                            v-for="(meta, idx) of latest_posts"
                            :key="meta.id"
                            :data-idx="idx"
                            class="my-4"
                        >
                            <ForumMetaCard :meta="meta" />
                        </div>
                        <div v-else>
                            <div class="m-8 rounded border border-gray-300 p-8">目前沒有新文章</div>
                        </div>
                    </transition-group>
                </div>
            </div>
            <div class="px-4 lg:px-6">
                <h2 class="text-lg lg:text-xl">即時提問</h2>
                <div class="w-full">
                    <transition-group
                        name="course-list"
                        :css="false"
                        @before-enter="course_animation.before_enter"
                        @enter="course_animation.enter"
                        @leave="course_animation.leave"
                    >
                        <div v-if="is_fetching" class="my-4"><ForumMetaCard is_loading /></div>
                        <div
                            v-else-if="latest_questions.length"
                            v-for="(meta, idx) of latest_questions"
                            :key="meta.id"
                            :data-idx="idx"
                            class="my-4"
                        >
                            <ForumMetaCard :meta="meta" />
                        </div>
                        <div v-else>
                            <div class="m-8 rounded border border-gray-300 p-8">目前沒有新提問</div>
                        </div>
                    </transition-group>
                </div>
            </div>
        </div>
    </div>
</template>
