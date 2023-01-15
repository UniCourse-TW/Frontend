<script lang="ts" setup>
import { PostMeta } from "../../types";

const props = withDefaults(
    defineProps<{
        meta?: PostMeta;
        is_loading?: boolean;
    }>(),
    {
        is_loading: false,
    },
);

const router = useRouter();

function handle_click() {
    if (!props.meta) return;
    router.push(`/forum/article/${props.meta.id}`);
}
</script>

<template>
    <Card :class="[is_loading ? '' : 'cursor-pointer']" @click="handle_click">
        <div v-if="!is_loading && meta" class="flex h-full flex-col gap-y-2">
            <div class="flex items-center gap-x-2">
                <img src="https://picsum.photos/seed/10/32/32" class="rounded-full" />
                <span class="text-lg">{{ meta.title }}</span>
            </div>

            <div class="flex-1"></div>

            <div class="text-sm">{{ meta.vote.up }} {{ meta.vote.down }}</div>
            <div class="text-sm text-gray-600">{{ meta.updated }}</div>
        </div>
        <div v-else class="flex h-full animate-pulse flex-col gap-y-3">
            <div class="flex items-center gap-x-4">
                <div class="h-10 w-10 rounded-full bg-slate-300"></div>
                <div class="h-5 w-32 rounded bg-slate-300"></div>
            </div>
            <div class="flex-1 py-2">
                <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-4">
                        <div class="col-span-2 h-4 rounded bg-slate-200"></div>
                        <div class="col-span-1 h-4 rounded bg-slate-200"></div>
                    </div>
                    <div class="h-4 rounded bg-slate-200"></div>
                </div>
            </div>
        </div>
    </Card>
</template>
