<script setup lang="ts">
const nav = {
    帳號: "/me",
    論壇: "/forum",
    課程: "/course",
};
</script>

<template>
    <div h="16" w="full" sticky="~" flex="~ row-reverse" shadow="~ indigo-100" bg="white" class="top-0 z-10">
        <!-- Logo on the left side -->
        <div id="logo" h="full" w="32" flex="~" class="absolute justify-center items-center left-0 top-0">
            <router-link to="/" h="full" w="full" flex="~" class="justify-center items-center">
                <div
                    text="transparent xl hover:2xl"
                    font="bold"
                    bg="clip-text gradient-to-br"
                    m="hover:l-2"
                    outline="none"
                    filter="hover:~ hover:-hue-rotate-90"
                    class="from-cyan-500 via-indigo-500 to-fuchsia-500 transition-all duration-200"
                >
                    UniCourse
                </div>
            </router-link>
        </div>

        <!-- Links on the right side -->
        <div v-for="(link, name) in nav" h="full" w="16 sm:20 lg:24">
            <router-link :to="link">
                <div
                    h="full"
                    w="full"
                    text="blue-400 hover:fuchsia-400 hover:lg"
                    font="hover:bold"
                    class="flex justify-center items-center transition-all duration-200"
                >
                    <span>{{ name }}</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<style scoped></style>
