<script lang="ts" setup>
import Swal from "sweetalert2";
import { UniCourseApiError } from "unicourse";
import uni from "../../uni";
const route = useRoute();
const router = useRouter();

const conv: { [key: string]: string } = {
    register: "註冊",
    login: "登入",
};
const processing = ref(false);
const type = ref(route.query.type === "register" ? "register" : "login");

const l_username = ref("");
const l_password = ref("");

const r_username = ref("");
const r_password = ref("");
const r_email = ref("");
const r_invite = ref("");

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
        const { username } = await uni.login(l_username.value, l_password.value);
        Swal.fire({
            icon: "success",
            title: "登入成功",
            text: `歡迎回來，${username}！`,
        });
    } catch (err) {
        if (err instanceof Error) {
            Swal.fire({
                icon: "error",
                title: "登入失敗",
                text: err.message,
            });
        }
    }
    processing.value = false;
}

async function register() {
    if (processing.value) {
        return;
    }

    processing.value = true;

    console.log(r_username.value, r_password.value, r_email.value);

    await new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });

    processing.value = false;
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
                    <Input label="帳號" placeholder="請輸入帳號" v-model="l_username" />
                    <Input label="密碼" placeholder="請輸入密碼" type="password" v-model="l_password" />
                    <div class="my-2 h-4 w-full">
                        <Link to="/auth/reset" class="float-right cursor-pointer text-blue-500 transition-all hover:text-fuchsia-500">
                            忘記密碼？
                        </Link>
                    </div>
                </div>
                <div v-else class="my-4 w-full">
                    <Input label="帳號" placeholder="請輸入帳號" v-model="r_username" />
                    <Input label="密碼" placeholder="請輸入密碼" type="password" v-model="r_password" />
                    <Input label="電子郵件" placeholder="請輸入電子郵件" v-model="r_email" />
                    <Input label="邀請碼" placeholder="請輸入邀請碼" v-model="r_invite" />
                </div>
            </transition>

            <transition name="fade" mode="out-in">
                <div class="mt-8 w-full text-center text-xl" :key="type">
                    <button
                        class="w-1/3 rounded bg-gradient-to-br from-cyan-500 via-indigo-500 to-fuchsia-500 p-2 px-4 text-white outline-none transition-all hover:hue-rotate-15 sm:w-1/4"
                        @click="() => (type === 'login' ? login() : register())"
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
