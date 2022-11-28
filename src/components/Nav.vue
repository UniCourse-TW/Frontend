<script setup lang="ts">
import Swal from "sweetalert2";
import use_store from "../store";

const props = defineProps({
    path: { default: "/" },
    logged_in: { default: false },
});

const nav = reactive<[string, string, () => boolean][]>([
    ["課程", "/course", () => true],
    ["論壇", "/forum", () => true],
    ["登入", "/auth", () => !props.logged_in],
    // ["部落格", "/blog", () => props.path === "/" || props.path.startsWith("/blog")],
]);

const computed_nav = computed(() => {
    return nav.filter((item) => item[2]());
});

const open_menu = ref(false);

const store = use_store();
const router = useRouter();
const logout = () => {
    store.logout();
    Swal.fire({
        icon: "success",
        title: "登出成功",
        text: "下次再見",
    });
    router.push("/");
};
</script>

<template>
    <div
        :class="[
            'sticky top-0 z-10 flex h-16 w-full justify-end px-2 transition-all duration-200',
            props.path === '/' ? ' bg-transparent' : 'bg-white shadow shadow-indigo-100',
        ]"
    >
        <!-- Logo on the left side -->
        <div id="logo" class="absolute left-0 top-0 flex h-full w-32 items-center justify-center">
            <Link to="/" class="flex h-full w-full items-center justify-center">
                <span
                    class="text-rainbow text-xl font-bold outline-none transition-all duration-200 hover:ml-2 hover:text-2xl hover:hue-rotate-15"
                >
                    UniCourse
                </span>
            </Link>
        </div>

        <!-- Links on the right side -->
        <transition-group name="nav-list">
            <div v-for="([name, link], idx) of computed_nav" :key="idx" class="transition-all duration-700 ease-out">
                <div class="h-full w-16 lg:w-24">
                    <Link :to="link">
                        <div
                            class="flex h-full w-full items-center justify-center text-blue-400 transition-all duration-200 hover:text-lg hover:font-bold hover:text-fuchsia-400"
                        >
                            <span>{{ name }}</span>
                        </div>
                    </Link>
                </div>
            </div>
            <div v-if="props.logged_in" class="relative" @mouseenter="open_menu = true" @mouseleave="open_menu = false">
                <div class="h-full w-16 lg:w-24">
                    <div
                        type="button"
                        class="flex h-full w-full items-center justify-center text-blue-400 transition-all duration-200 hover:text-lg hover:font-bold hover:text-fuchsia-400"
                    >
                        我的帳號
                    </div>
                </div>

                <div v-show="open_menu" class="absolute top-12 right-0 z-10 w-16 origin-top-right rounded-md bg-white shadow-lg lg:w-24">
                    <div class="py-1">
                        <a href="/me" class="block px-4 py-2 text-sm text-gray-700 hover:text-fuchsia-400">個人頁面</a>
                        <a class="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:text-fuchsia-400" @click="logout">登出</a>
                    </div>
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
