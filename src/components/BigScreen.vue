<script lang="ts" setup>
defineProps({ content: { default: "" } });
</script>

<template>
    <div class="flex h-[calc(100vh-4rem)] w-screen items-center justify-center">
        <span class="text-rainbow pb-2 text-4xl font-extrabold italic sm:text-7xl lg:text-9xl"> {{ content }} </span>
    </div>
</template>
