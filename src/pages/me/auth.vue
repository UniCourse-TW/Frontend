<script lang="ts" setup>
const route = useRoute();

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

useHead({ title: conv[type.value] + " | UniCourse" });

async function login() {
    if (processing.value) {
        return;
    }

    processing.value = true;

    console.log(l_username.value, l_password.value);

    await new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });

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
    <div w="full">
        <div w="full" max-w="500px" p="x-4 t-8" m="auto" flex="~ col" class="justify-start items-center">
            <h1 text="transparent 3xl sm:4xl lg:5xl" bg="clip-text gradient-to-br" class="from-cyan-500 via-indigo-500 to-fuchsia-500">
                {{ conv[type] }}
            </h1>
            <transition name="fade" mode="out-in">
                <div v-if="type === 'login'" w="full" m="y-4">
                    <div w="full" m="y-2">
                        <label text="blue-500 lg">
                            帳號 <br />
                            <input
                                type="text"
                                placeholder="請輸入帳號"
                                text="indigo-500"
                                w="full"
                                m="2"
                                p="x-2 y-2"
                                outline="none"
                                border="b-3 b-blue-300 focus:b-indigo-500"
                                class="transition-all duration-200"
                                v-model="l_username"
                            />
                        </label>
                    </div>
                    <div w="full" m="y-2">
                        <label text="blue-500 lg">
                            密碼 <br />
                            <input
                                type="password"
                                placeholder="請輸入密碼"
                                text="indigo-500"
                                w="full"
                                m="2"
                                p="x-2 y-2"
                                outline="none"
                                border="b-3 b-blue-300 focus:b-indigo-500"
                                class="transition-all duration-200"
                                v-model="l_password"
                            />
                        </label>
                    </div>
                    <div text="center xl" m="t-8">
                        <button
                            p="y-2 x-4"
                            bg="gradient-to-br"
                            text="white shadow-xl"
                            w="1/4"
                            outline="none"
                            :filter="processing ? '~ -hue-rotate-20' : 'hover:~ hover:-hue-rotate-20'"
                            class="rounded from-cyan-500 via-indigo-500 to-fuchsia-500 transition-all duration-200"
                            @click="login"
                        >
                            {{ processing ? "登入中" : "登入" }}
                        </button>
                    </div>
                    <div text="center" m="t-8">
                        <button
                            p="y-2 x-4"
                            bg="clip-text gradient-to-br"
                            text="transparent hover:xl"
                            w="1/3"
                            outline="none"
                            class="rounded from-cyan-500 via-indigo-500 to-fuchsia-500 transition-all duration-200"
                            @click="type = type === 'login' ? 'register' : 'login'"
                        >
                            {{ type === "login" ? "想要註冊嗎？" : "是要登入嗎？" }}
                        </button>
                    </div>
                </div>
                <div v-else w="full" m="y-4">
                    <div w="full">
                        <div w="full" m="y-2">
                            <label text="blue-500 lg">
                                帳號 <br />
                                <input
                                    type="text"
                                    placeholder="請輸入帳號"
                                    text="indigo-500"
                                    w="full"
                                    m="2"
                                    p="x-2 y-2"
                                    outline="none"
                                    border="b-3 b-blue-300 focus:b-indigo-500"
                                    class="transition-all duration-200"
                                    v-model="r_username"
                                />
                            </label>
                        </div>
                        <div w="full" m="y-2">
                            <label text="blue-500 lg">
                                密碼 <br />
                                <input
                                    type="password"
                                    placeholder="請輸入密碼"
                                    text="indigo-500"
                                    w="full"
                                    m="2"
                                    p="x-2 y-2"
                                    outline="none"
                                    border="b-3 b-blue-300 focus:b-indigo-500"
                                    class="transition-all duration-200"
                                    v-model="r_password"
                                />
                            </label>
                        </div>
                        <div w="full" m="y-2">
                            <label text="blue-500 lg">
                                電子郵件 <br />
                                <input
                                    type="email"
                                    placeholder="請輸入電子郵件"
                                    text="indigo-500"
                                    w="full"
                                    m="2"
                                    p="x-2 y-2"
                                    outline="none"
                                    border="b-3 b-blue-300 focus:b-indigo-500"
                                    class="transition-all duration-200"
                                    v-model="r_email"
                                />
                            </label>
                        </div>
                        <div text="center xl" m="t-8">
                            <button
                                p="y-2 x-4"
                                bg="gradient-to-br"
                                text="white shadow-xl"
                                w="1/4"
                                outline="none"
                                :filter="processing ? '~ -hue-rotate-20' : 'hover:~ hover:-hue-rotate-20'"
                                class="rounded from-cyan-500 via-indigo-500 to-fuchsia-500 transition-all duration-200"
                                @click="register"
                            >
                                {{ processing ? "處理中" : "註冊" }}
                            </button>
                        </div>
                    </div>
                    <div text="center" m="t-8">
                        <button
                            p="y-2 x-4"
                            bg="clip-text gradient-to-br"
                            text="transparent hover:xl"
                            w="1/3"
                            outline="none"
                            class="rounded from-cyan-500 via-indigo-500 to-fuchsia-500 transition-all duration-200"
                            @click="type = type === 'login' ? 'register' : 'login'"
                        >
                            {{ type === "login" ? "想要註冊嗎？" : "是要登入嗎？" }}
                        </button>
                    </div>
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
</style>
