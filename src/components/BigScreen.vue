<script lang="ts" setup>
defineProps({ content: { default: "" } });
</script>

<template>
    <div w="screen" h="[calc(100vh-4rem)]" flex="~" class="justify-center items-center">
        <h1
            text="transparent 4xl sm:7xl lg:9xl"
            p="b-0.5rem"
            font="extrabold italic"
            bg="clip-text gradient-to-br"
            class="from-cyan-500 via-indigo-500 to-fuchsia-500"
        >
            {{ content }}
        </h1>
    </div>
</template>
