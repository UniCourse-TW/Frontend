<script lang="ts" setup>
const props = defineProps({
    max: { default: 5 },
    value: { default: 0 },
    mutable: { default: false },
});
const emit = defineEmits(["mutate"]);

const hoverIndex = ref(0);
</script>

<template>
    <i-octicon-star-fill-16
        v-for="idx in props.max"
        :key="idx"
        :class="[
            'inline',
            '-translate-y-0.5',
            !props.mutable || hoverIndex === 0
                ? idx <= props.value + 0.5
                    ? 'text-yellow-400'
                    : 'text-gray-200'
                : idx <= hoverIndex
                ? 'text-yellow-200'
                : 'text-gray-200',
            props.mutable && 'hover:cursor-pointer',
        ]"
        @mouseover="hoverIndex = idx"
        @mouseleave="hoverIndex = 0"
        @click="emit('mutate', idx)"
    />
</template>
