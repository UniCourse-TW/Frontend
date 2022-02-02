<script lang="ts" setup>
defineProps({ content: { default: "" } });
</script>

<template>
    <span class="bg-gradient-to-br from-cyan-500 via-indigo-500 to-fuchsia-500 bg-clip-text text-transparent"> {{ content }} </span>
</template>
