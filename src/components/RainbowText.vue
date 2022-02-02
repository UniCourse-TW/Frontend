<script lang="ts" setup>
defineProps({ content: { default: "" } });
</script>

<template>
    <span text="transparent" bg="clip-text gradient-to-br" class="from-cyan-500 via-indigo-500 to-fuchsia-500"> {{ content }} </span>
</template>
