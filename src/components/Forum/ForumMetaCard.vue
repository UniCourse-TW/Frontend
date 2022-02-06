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
        class="h-40 w-full cursor-pointer rounded border bg-white p-4 shadow shadow-blue-200 transition-all hover:shadow-md hover:shadow-indigo-200 sm:p-5 lg:p-6"
        @click="handle_click"
    >
        <div>
            <span class="text-lg"> {{ meta.title }} </span> <br />
            <span> 課程：{{ `${meta.course.year}-${meta.course.term} ${meta.course.name}` }} </span> <br />
            More Course Meta...
        </div>
    </div>
</template>

<style scoped>
.full-card-enter-active {
    transition: all 0.3s ease;
}
.full-card-leave-active {
    transition: all 0.3s ease 0.2s;
}

.full-card-enter-from,
.full-card-leave-to {
    opacity: 0;
}

.full-card-enter-active >>> [data-locator="card"],
.full-card-leave-active >>> [data-locator="card"] {
    transition: all 0.25s ease-in-out;
}

.full-card-enter-from >>> [data-locator="card"],
.full-card-leave-to >>> [data-locator="card"] {
    transform: translateY(100vh);
}
</style>
