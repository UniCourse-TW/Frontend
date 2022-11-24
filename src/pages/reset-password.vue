<script lang="ts" setup>
import uni from "../uni";
import Swal from "sweetalert2";
import { hash } from "unicourse";

useHead({ title: "重設密碼 | UniCourse" });

const route = useRoute();
const router = useRouter();

const id = route.query.id as string;
if (!id) {
    Swal.fire({
        icon: "error",
        title: "錯誤",
        text: "無效的驗證碼",
    });
    router.push("/");
}

const password = ref("");
const processing = ref(false);

async function submit() {
    if (processing.value) {
        return;
    }
    processing.value = true;

    try {
        await uni.req("auth/reset", {
            method: "POST",
            body: {
                id,
                password: await hash(password.value),
            },
        });

        Swal.fire({
            icon: "success",
            title: "密碼重設成功",
            text: "你現在可以使用新密碼登入了",
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
                <span class="text-rainbow text-3xl sm:text-4xl lg:text-5xl">重設密碼</span>
            </transition>
            <transition name="fade" mode="out-in">
                <Input label="密碼" placeholder="請輸入新密碼" v-model="password" type="password" />
            </transition>
            <transition name="fade" mode="out-in">
                <div class="mt-8 w-full text-center text-xl">
                    <button
                        class="w-1/3 rounded bg-gradient-to-br from-cyan-500 via-indigo-500 to-fuchsia-500 p-2 px-4 text-white outline-none transition-all hover:hue-rotate-15 sm:w-1/4"
                        @click="submit"
                    >
                        {{ processing ? "處理中..." : "確認" }}
                    </button>
                </div>
            </transition>
        </div>
    </div>
</template>
