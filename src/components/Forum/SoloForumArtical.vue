<script lang="ts" setup>
import type { PropType } from "vue";
import type { Post } from "../../types";

const props = defineProps({
    post: {
        type: Object as PropType<Post | null>,
        default: () => null,
    },
});

const post = props.post;
</script>

<template>
    <div v-if="post">
        <div class="h-full w-full overflow-hidden rounded-t-2xl bg-white p-4">
            <div class="inline-block rounded bg-purple-700 px-1 py-0.5 text-sm text-white">
                <div v-if="post.type == 'review'">
                    <span>{{ "修課心得" }}</span>
                </div>
                <div v-else-if="post.type == 'question'">
                    <span>{{ "提問" }}</span>
                </div>
                <div v-else-if="post.type == 'other'">
                    <span>{{ "其他" }}</span>
                </div>
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

            <h2 class="my-1 text-sm text-gray-500">發布者：{{ post.author }}</h2>
            <h2 class="my-1 text-sm text-gray-500">{{ post.time }}</h2>

            <hr />

            <div v-if="post.type == 'review'" class="mt-2 mb-2 grid grid-cols-[4rem_auto] text-gray-600">
                <span>甜度</span>
                <div>
                    <IconStars :value="post.course.rating.sweetness" />
                    ( {{ post.course.rating.sweetness }} 分 )
                </div>
                <span>涼度</span>
                <div>
                    <IconStars :value="post.course.rating.easiness" />
                    ( {{ post.course.rating.easiness }} 分 )
                </div>
                <span>實用度</span>
                <div>
                    <IconStars :value="post.course.rating.usefulness" />
                    ( {{ post.course.rating.usefulness }} 分 )
                </div>
            </div>
            <h1 class="my-1 text-base font-bold text-gray-600">{{ post.title }}</h1>
            <div>{{ post.content }}</div>
            <div class="relative mt-3 sm:mt-8">
                <div class="absolute inset-y-0 right-0 inline-grid w-16 grid-cols-4 gap-1">
                    <img src="../../assets/icons/thumbs_up.svg" class="w-4" />
                    <h6 class="inset-y-0 right-0 text-xs text-purple-700">{{ post.vote.up }}</h6>
                    <img src="../../assets/icons/thumbs_down.svg" class="w-4" />
                    <h6 class="inset-y-0 right-0 text-xs text-purple-700">{{ post.vote.down }}</h6>
                </div>
            </div>
            <div class="h-5"></div>
        </div>
    </div>
</template>
