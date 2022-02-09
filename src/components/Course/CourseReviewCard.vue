<script lang="ts" setup>
import type { PropType } from "vue";
import type { CourseReview } from "../../types";
import { marked } from "marked";

const props = defineProps({
    review: {
        type: Object as PropType<CourseReview | null>,
        default: () => null,
    },
});
</script>

<template>
    <div class="m-2 max-w-md rounded-md border p-2">
        <div v-if="props.review">
            <div class="flex h-10 items-center gap-x-2">
                <img src="https://picsum.photos/32" class="h-8 w-8 rounded-full border border-indigo-200 bg-gray-200" />
                <div class="mx-1 flex flex-1 flex-col justify-center">
                    <span class="text-gray-700">{{ props.review.user }}</span>
                    <span class="text-xs text-gray-500">{{ new Date(props.review.time).toLocaleString() }}</span>
                </div>
            </div>
            <div class="my-2 pl-11 pr-2" v-html="marked.parse(props.review.content)"></div>
            <div class="flex items-center justify-between pr-2 text-xs">
                <div class="flex flex-col items-center">
                    <span class="mx-2 inline-block w-full text-sm text-gray-500">甜度</span>
                    <span><IconStars :value="props.review.rating.sweetness" /></span>
                </div>
                <div class="flex flex-col items-center">
                    <span class="mx-2 inline-block w-full text-sm text-gray-500">涼度</span>
                    <span><IconStars :value="props.review.rating.easiness" /></span>
                </div>
                <div class="flex flex-col items-center">
                    <span class="mx-2 inline-block w-full text-sm text-gray-500">實用度</span>
                    <span><IconStars :value="props.review.rating.usefulness" /></span>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="flex h-10 animate-pulse items-center gap-x-2">
                <div class="h-8 w-8 rounded-full border border-indigo-200 bg-gray-200"></div>
                <div class="mx-1 flex flex-1 flex-col justify-center">
                    <div class="h-4 w-1/2 rounded bg-gray-200"></div>
                    <div class="mt-1 h-2 w-1/2 rounded-sm bg-gray-200"></div>
                </div>
            </div>
            <div class="my-2 animate-pulse pl-11 pr-2">
                <p v-for="i in 3" class="my-1 h-4 w-full rounded bg-gray-200"></p>
                <p class="my-1 h-4 w-2/3 rounded bg-gray-200"></p>
            </div>
            <div class="flex items-center justify-between pr-2 text-xs">
                <div class="flex flex-col items-center">
                    <span class="mx-2 inline-block w-full text-sm text-gray-500">甜度</span>
                    <span class="animate-pulse"><IconStars :value="0" /></span>
                </div>
                <div class="flex flex-col items-center">
                    <span class="mx-2 inline-block w-full text-sm text-gray-500">涼度</span>
                    <span class="animate-pulse"><IconStars :value="0" /></span>
                </div>
                <div class="flex flex-col items-center">
                    <span class="mx-2 inline-block w-full text-sm text-gray-500">實用度</span>
                    <span class="animate-pulse"><IconStars :value="0" /></span>
                </div>
            </div>
        </div>
    </div>
</template>
