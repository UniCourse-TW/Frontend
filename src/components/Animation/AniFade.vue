<script lang="ts" setup>
import type { PropType } from "vue";

const props = defineProps({
    direction: {
        type: String as PropType<"none" | "up" | "down" | "left" | "right">,
        default: "none",
    },
    mode: {
        type: String as PropType<"default" | "out-in" | "in-out">,
        default: "out-in",
    },
});

const outside = computed(() => {
    switch (props.direction) {
        case "up":
            return "-translate-y-4";
        case "down":
            return "translate-y-4";
        case "left":
            return "-translate-x-4";
        case "right":
            return "translate-x-4";
        default:
            return "";
    }
});

const inside = computed(() => {
    switch (props.direction) {
        case "up":
        case "down":
            return "translate-y-0";
        case "left":
        case "right":
            return "translate-x-0";
        default:
            return "";
    }
});
</script>

<template>
    <transition
        enter-active-class="duration-150 ease-out"
        :enter-from-class="['opacity-0', outside].join(' ')"
        :enter-to-class="['opacity-100', inside].join(' ')"
        leave-active-class="duration-150 ease-in"
        :leave-from-class="['opacity-100', inside].join(' ')"
        :leave-to-class="['opacity-0', outside].join(' ')"
        :mode="props.mode"
    >
        <slot></slot>
    </transition>
</template>
