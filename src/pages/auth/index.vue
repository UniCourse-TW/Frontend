<script lang="ts" setup>
import Swal from "sweetalert2";
import use_store from "../../store";
import uni from "../../uni";
import { useStorage } from "@vueuse/core";
import { EndpointResponseBody } from "unicourse";

const route = useRoute();
const router = useRouter();
const store = use_store();

if (store.logged_in) {
    router.push("/me");
}

const conv: { [key: string]: string } = {
    register: "註冊",
    login: "登入",
};
const processing = ref(false);
const type = ref(route.query.type === "register" ? "register" : "login");

const stored_username = useStorage("unicourse-username", "");
const remember_username = ref(true);
const state = reactive({
    username: stored_username,
    password: "",
    email: "",
    invitation: "",
});

useHead({ title: conv[type.value] + " | UniCourse" });

function switch_type() {
    type.value = type.value === "login" ? "register" : "login";
    router.push({ query: { type: type.value } });
}

async function login() {
    if (processing.value) {
        return;
    }

    processing.value = true;

    try {
        const { username } = await uni.login(state.username, state.password);
        store.login();
        const me = reactive<EndpointResponseBody<"me">>({
            username: "",
            profile: {
                avatar: "https://unicourse-tw.github.io/Public-Assets/icon/UniCourse_icon_fade.256x256.png",
                banner: "",
                bio: "",
                email: "",
                location: "",
                name: "",
                school: "",
                extra: {},
            },
            email: {
                email: "",
                verified: false,
            },
            groups: [],
            invitations: [],
            perms: [],
        });
        try {
            Object.assign(me, await uni.req("me"));
        } catch {}
        Swal.fire({
            icon: "success",
            title: "登入成功",
            text: `歡迎回來，${me.profile.name}！`,
        });
        if (!remember_username.value) {
            stored_username.value = null;
        }
        router.push("/me");
    } catch {}
    processing.value = false;
}

async function register() {
    if (processing.value) {
        return;
    }

    processing.value = true;

    try {
        const { username, email } = await uni.register(state.username, state.password, state.email, {
            invitation: state.invitation,
        });
        Swal.fire({
            icon: "success",
            title: "註冊成功",
            text: `歡迎加入 UniCourse，${username}！ 我們稍後會將驗證信寄到 ${email}，記得去收信喔！`,
        });
        router.push("/me");
    } catch {}
    processing.value = false;
}

const submit = computed(() => (type.value === "login" ? login : register));

function keyup(evt: KeyboardEvent) {
    if (evt.key === "Enter" && evt.target instanceof HTMLInputElement) {
        submit.value();
    }
}
</script>

<template>
    <div class="w-full">
        <div class="m-auto flex w-full max-w-lg flex-col items-center justify-start px-4 pt-8">
            <transition name="up" mode="out-in">
                <span :key="conv[type]" class="text-rainbow text-3xl sm:text-4xl lg:text-5xl"> {{ conv[type] }} </span>
            </transition>
            <transition name="fade" mode="out-in">
                <div v-if="type === 'login'" class="my-4 w-full">
                    <Input label="帳號" placeholder="請輸入帳號" v-model="state.username" />
                    <Input label="密碼" placeholder="請輸入密碼" type="password" v-model="state.password" @keyup="keyup" />
                    <div class="mt-10 mb-2 flex h-4 w-full items-center justify-between">
                        <div class="flex items-center">
                            <input
                                v-model="remember_username"
                                id="remember-username-checkbox"
                                type="checkbox"
                                class="h-4 w-4 rounded border-blue-300 bg-blue-100 text-blue-500"
                            />
                            <label for="remember-username-checkbox" class="ml-2 text-sm font-medium text-blue-500 hover:text-fuchsia-500"
                                >記住帳號</label
                            >
                        </div>
                        <Link to="/auth/reset" class="cursor-pointer text-blue-500 transition-all hover:text-fuchsia-500">
                            忘記密碼？
                        </Link>
                    </div>
                </div>
                <div v-else class="my-4 w-full">
                    <Input label="帳號" placeholder="請輸入帳號" v-model="state.username" />
                    <Input label="密碼" placeholder="請輸入密碼" type="password" v-model="state.password" />
                    <Input label="電子郵件" placeholder="請輸入電子郵件" v-model="state.email" />
                    <Input label="邀請碼" placeholder="請輸入邀請碼" v-model="state.invitation" />
                </div>
            </transition>

            <transition name="fade" mode="out-in">
                <div class="mt-8 w-full text-center text-xl" :key="type">
                    <button
                        class="w-1/3 rounded bg-gradient-to-br from-cyan-500 via-indigo-500 to-fuchsia-500 p-2 px-4 text-white outline-none transition-all hover:hue-rotate-15 sm:w-1/4"
                        @click="submit"
                    >
                        {{ processing ? conv[type] + "中" : conv[type] }}
                    </button>
                </div>
            </transition>

            <transition name="down" mode="out-in">
                <div :key="type" class="mt-8 w-full text-center">
                    <span
                        class="text-rainbow cursor-pointer p-2 px-4 outline-none transition-all duration-200 hover:text-xl"
                        @click="switch_type"
                    >
                        {{ type === "login" ? "想要註冊嗎？" : "是要登入嗎？" }}
                    </span>
                </div>
            </transition>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.up-enter-active,
.up-leave-active {
    transition: transform 0.5s;
}

.up-enter-from,
.up-leave-to {
    transform: translateY(-100vh);
}

.down-enter-active,
.down-leave-active {
    transition: transform 0.5s;
}

.down-enter-from,
.down-leave-to {
    transform: translateY(100vh);
}
</style>
