<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
    to: { type: String, required: true },
    replace: { type: Boolean, default: false },
    class: { type: String, default: "" },
    icon: { type: Boolean, default: true },
});

const is_external = computed(() => {
    return typeof props.to === "string" && props.to.startsWith("http");
});

const preloaded = reactive<string[]>([]);

async function preload() {
    if (preloaded.includes(props.to)) {
        return;
    }
    preloaded.push(props.to);

    let resourses, start_time;
    try {
        resourses = performance.getEntriesByType("resource");
        start_time = performance.now();
    } catch {
        console.log("[Link] Performance API is not supported");
    }

    try {
        const link = router.resolve(props.to);
        const route = link.matched[0];
        const component = route?.components?.default;
        if (route && typeof component === "function") {
            // @ts-ignore
            await component();
        }
    } catch (err) {
        console.error("[Link] Preload Failed", err);
    }

    if (resourses && start_time) {
        const after = performance.getEntriesByType("resource");
        const diff = after.slice(resourses.length) as PerformanceResourceTiming[];
        const time = (performance.now() - start_time).toFixed(1);
        console.log(`[Link] Preload ${diff.reduce((acc, curr) => acc + (curr.transferSize || 0), 0)} bytes in ${time} ms`);
    }
}

function go(): void {
    try {
        if (props.replace) {
            router.replace(props.to);
        } else {
            router.push(props.to);
        }
    } catch (err) {
        console.error("[Link] Go failed", err);
    }
}
</script>

<template>
    <a v-if="is_external" :href="to" target="_blank" rel="noopener" :class="props.class || 'text-blue-700'">
        <i-octicon-link-external v-if="props.icon" class="mr-1 inline -translate-y-0.5" />
        <slot />
    </a>
    <a
        v-else
        v-bind="props"
        @click="go"
        @mouseenter="preload"
        @touchstart.passive="preload"
        href="javascript:void(0)"
        :class="props.class || 'text-purple-700'"
    >
        <slot />
    </a>
</template>
