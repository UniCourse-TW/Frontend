<script lang="ts" setup>
import type { PostMeta } from "../../types";

const props = defineProps({
    meta: { default: <PostMeta | null>null },
});

const router = useRouter();

function handle_click() {
    router.push(`/forum/article/${props.meta.id}`);
}
</script>

<template>
    <div
        v-if="meta"
        class="h-48 w-full cursor-pointer rounded border bg-white p-4 shadow shadow-blue-200 transition-all hover:shadow-md hover:shadow-indigo-200 sm:p-5 lg:p-6"
        @click="handle_click"
    >
        <div class="flex h-full flex-col gap-y-2">
            <div class="flex items-center gap-x-2">
                <img src="https://picsum.photos/seed/1/32/32" class="rounded-full" />
                <span class="text-lg">{{ meta.title }}</span>
            </div>
            <div v-if="meta.course" class="text-gray-600">課程：{{ `${meta.course.year}-${meta.course.term} ${meta.course.name}` }}</div>

            <div class="flex-1"></div>

            <div>{{ meta.tags.map((t) => `#${t}`).join(" ") }}</div>
            <div>{{ meta.time }}</div>
        </div>
    </div>
</template>
