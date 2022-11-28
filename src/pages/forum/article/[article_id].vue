<script lang="ts" setup>
import type { Post } from "@unicourse-tw/prisma";
import { posts } from "../../../api";

useHead({ title: "文章 | UniCourse" });

const route = useRoute();
const article_id = route.params.article_id;

const post = ref<Post | null>(null);

query();
async function query() {
    const id = typeof article_id === "string" ? article_id : article_id.join("");
    // post.value.id =
    await posts.get(id);
}
</script>

<template>
    <div>
        <div v-if="post">
            <SoloForumArtical :post="post" class="h-screen w-screen" />
        </div>
        <div v-else>載入中...</div>
    </div>
</template>
