<script lang="ts" setup>
defineProps({
    modelValue: {
        type: Number,
        default: 0,
    },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
    <IconStars :value="modelValue" :mutable="true" @mutate="(v: number) => emit('update:modelValue', v)" />
</template>
