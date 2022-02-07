<script lang="ts" setup>
const props = defineProps({
    max: { default: 5 },
    value: { default: 0 },
});
</script>

<template>
    <i-octicon-star-fill-16
        v-for="idx in props.max"
        :key="idx"
        :class="['inline', '-translate-y-0.5', idx <= props.value + 0.5 ? 'text-yellow-400' : 'text-gray-200']"
    />
</template>
