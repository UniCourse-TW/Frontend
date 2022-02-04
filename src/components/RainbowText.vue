<script lang="ts" setup>
const props = defineProps({
    bold: { default: false },
    italic: { default: false },
    reversed: { default: false },
    class: { default: "" },
});

const classes = computed(() => ({
    "bg-gradient-to-br": true,
    "from-cyan-500": true,
    "via-indigo-500": true,
    "to-fuchsia-500": true,
    "bg-clip-text": !props.reversed,
    "text-transparent": !props.reversed,
    "text-white": props.reversed,
    "font-bold": props.bold,
    italic: props.italic,
    ...props.class.split(" ").reduce((acc, cur) => ({ ...acc, [cur]: true }), {}),
}));
</script>

<template>
    <span :class="classes"> <slot></slot> </span>
</template>
