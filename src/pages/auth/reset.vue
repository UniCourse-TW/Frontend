<script lang="ts" setup>
import uni from "../../uni";
import Swal from "sweetalert2";

useHead({ title: "忘記密碼 | UniCourse" });

const router = useRouter();
const email = ref("");
const processing = ref(false);

async function send() {
    if (processing.value) {
        return;
    }
    processing.value = true;

    try {
        const { email: address } = await uni.req("auth/send-reset", {
            method: "POST",
            body: {
                email: email.value,
            },
        });

        Swal.fire({
            icon: "info",
            title: "已發送",
            text: `已發送重設密碼信件至 ${address}`,
        });

        router.replace("/auth");
    } catch {}

    processing.value = false;
}
</script>

<template>
    <div class="w-full">
        <div class="m-auto flex w-full max-w-lg flex-col items-center justify-start px-4 pt-8">
            <transition name="up" mode="out-in">
                <span class="text-rainbow text-3xl sm:text-4xl lg:text-5xl">忘記密碼</span>
            </transition>
            <transition name="fade" mode="out-in">
                <Input label="信箱" placeholder="請輸入註冊信箱" v-model="email" @keyup.enter="send" />
            </transition>
            <transition name="fade" mode="out-in">
                <div class="mt-8 w-full text-center text-xl">
                    <button
                        class="w-1/3 rounded bg-gradient-to-br from-cyan-500 via-indigo-500 to-fuchsia-500 p-2 px-4 text-white outline-none transition-all hover:hue-rotate-15 sm:w-1/4"
                        @click="send"
                    >
                        {{ processing ? "處理中..." : "確認" }}
                    </button>
                </div>
            </transition>
        </div>
    </div>
</template>
