<script lang="ts" setup>
import { useLink, useRouter } from "vue-router";

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

const preloading = reactive<string[]>([]);

async function preload() {
    if (preloading.includes(props.to)) {
        return;
    }
    preloading.push(props.to);

    try {
        const link = useLink({ to: props.to, replace: props.replace });
        const route = link.route.value.matched[0];
        const component = route?.components?.default;
        if (route && typeof component === "function") {
            // @ts-ignore
            await component();
        }
    } catch (err) {
        console.error("preload failed", err);
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
        console.error("go failed", err);
    }
}
</script>

<template>
    <a v-if="is_external" :href="to" target="_blank" :class="props.class || 'text-blue-700'">
        <i-octicon-link-external v-if="props.icon" class="mr-1 inline -translate-y-0.5" />
        <slot />
    </a>
    <a
        v-else
        v-bind="props"
        @click="go"
        @mouseenter="preload"
        @touchstart="preload"
        href="javascript:void(0)"
        :class="props.class || 'text-purple-700'"
    >
        <slot />
    </a>
</template>
