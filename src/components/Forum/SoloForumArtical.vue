<script lang="ts" setup>
import type { PropType } from "vue";
import type { PostVote, PostRating, PostMeta, PostInfo } from "../../types";
import { marked } from "marked";

const props = defineProps({
    post: {
        type: Object as PropType<Post | null>,
        default: () => null,
    },
    postRating: {
        type: Object as PropType<PostRating | null>,
        default: () => null,
    },
});

const post = props.post;
const postRating = props.postRating;
</script>

<template>
    <div class="h-full w-full overflow-hidden rounded-t-2xl bg-white p-4">
        <div class="inline-block rounded bg-purple-700 px-1 py-0.5 text-sm text-white">
            <span>{{ "修課心得" }}</span>
        </div>
        <h1 class="my-1 text-xl font-bold">
            <span>{{ post.course.name }}</span>
            <span class="text-base">
                <span class="text-gray-400"> | </span>
                <span title="開課學年度" class="text-gray-600">{{ post.course.year }}</span>
                <span class="text-gray-400">-</span>
                <span title="開課學期" class="text-gray-600">{{ post.course.term }}</span>
                <span class="text-gray-400"> | </span>
                <span title="授課教師" class="text-gray-600">教師：{{ post.course.teacher }}</span>
            </span>
        </h1>

        <h2 class="my-1 text-sm text-gray-500">撰寫者：{{ post.author }}</h2>
        <h2 class="my-1 text-sm text-gray-500">{{ post.time }}</h2>

        <hr />

        <div class="mt-2 mb-2 grid grid-cols-[4rem_auto] text-gray-600">
            <span>甜度</span>
            <div>
                <IconStars :value="postRating.sweetness" />
                ( {{ postRating.sweetness }} 分 )
            </div>
            <span>涼度</span>
            <div>
                <IconStars :value="postRating.easiness" />
                ( {{ postRating.easiness }} 分 )
            </div>
            <span>實用度</span>
            <div>
                <IconStars :value="postRating.usefulness" />
                ( {{ postRating.usefulness }} 分 )
            </div>
        </div>
        <h1 class="my-1 text-base font-bold text-gray-600">{{ post.title }}</h1>
        <div>{{ post.content }}</div>
    </div>
</template>
