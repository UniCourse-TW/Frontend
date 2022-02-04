<script setup lang="ts">
import use_store from "../store";

const route = useRoute();
const store = use_store();

const nav = reactive<[string, string, () => boolean][]>([
    ["我", "/me", () => !!store.user],
    ["登入", "/auth", () => !store.user],
    ["論壇", "/forum", () => true],
    ["課程", "/course", () => true],
    ["部落格", "/blog", () => route.path === "/" || route.path.startsWith("/blog")],
]);

const computed_nav = computed(() => {
    return nav.filter((item) => item[2]());
});
</script>

<template>
    <div
        :class="
            'sticky top-0 z-10 flex h-16 w-full flex-row-reverse transition-all duration-200 ' +
            ($route.path === '/' ? ' bg-transparent' : 'bg-white shadow shadow-indigo-100')
        "
    >
        <!-- Logo on the left side -->
        <div id="logo" class="absolute left-0 top-0 flex h-full w-32 items-center justify-center">
            <router-link to="/" class="flex h-full w-full items-center justify-center">
                <RainbowText
                    class="text-xl font-bold outline-none transition-all duration-200 hover:ml-2 hover:text-2xl hover:hue-rotate-15"
                >
                    UniCourse
                </RainbowText>
            </router-link>
        </div>

        <!-- Links on the right side -->
        <transition-group name="nav-list">
            <div v-for="([name, link], idx) of computed_nav" :key="idx" class="trnasition-all duration-700 ease-out">
                <div class="h-full w-16 sm:w-20 lg:w-24">
                    <router-link :to="link">
                        <div
                            class="flex h-full w-full items-center justify-center text-blue-400 transition-all duration-200 hover:text-lg hover:font-bold hover:text-fuchsia-400"
                        >
                            <span>{{ name }}</span>
                        </div>
                    </router-link>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<style scoped>
.nav-list-enter-from,
.nav-list-leave-to {
    opacity: 0;
    transform: translateY(-2rem);
}
</style>
