<script lang="ts" setup>
import { posts } from "../../api";
import { PostMeta } from "../../types";

useHead({ title: "論壇搜尋 | UniCourse" });

const query_body = ref(<string>(useRoute().query.q || ""));
const query_results = reactive(<PostMeta[]>[]);
const is_fetching = ref(true);
const adv = ref(false);

if (query_body.value) {
    query();
}

function query() {
    posts
        .get_list({ q: query_body.value, offset: 0, limit: 20 })
        .then((data) => {
            query_results.splice(0, query_results.length, ...data);
        })
        .catch(console.error)
        .finally(() => {
            // for demo purpose, temporarily extend the duration of loading
            setTimeout(() => (is_fetching.value = false), 1000);
            // is_fetching.value = false;
        });
}

const post_animation = {
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
        <div class="px-10 py-2">
            <a href="/forum" class="hover:underline">返回論壇首頁</a>
        </div>

        <SearchBar v-model="query_body" :search="query" :advanced="() => (adv = !adv)" placeholder="搜尋文章及提問" />

        <div v-if="adv" class="flex justify-center px-6 lg:px-10">
            <div class="w-11/12">進階選項</div>
        </div>

        <div class="w-full px-8 lg:px-10">
            <transition-group
                name="course-list"
                :css="false"
                @before-enter="post_animation.before_enter"
                @enter="post_animation.enter"
                @leave="post_animation.leave"
            >
                <div v-if="is_fetching" class="my-4"><ForumMetaCard is_loading /></div>
                <div v-else-if="query_results.length" v-for="(meta, idx) of query_results" :key="meta.id" :data-idx="idx" class="my-4">
                    <ForumMetaCard :meta="meta" />
                </div>
                <div v-else>
                    <div class="m-8 rounded border border-gray-300 p-8">查無結果，請換個關鍵字試試？</div>
                </div>
            </transition-group>
        </div>
    </div>
</template>
