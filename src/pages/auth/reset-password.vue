<script lang="ts" setup>
import uni from "../../uni";
import Swal from "sweetalert2";
const route = useRoute();
const id = route.params.id;

useHead({ title: "重設密碼 | UniCourse" });
const n_password = ref(""); // new password
const processing = ref(false);
const fin = ref(false);

async function submit() {
    if (processing.value) {
        return;
    }

    processing.value = true;
    fin.value = false;
    // console.log(l_username.value, l_password.value);

    const id = route.query.id as string;

    // return to Backend
    try {
        // await uni.req("auth/reset", {
        //     method: "POST",
        //     body: {
        //         "password" = n_password
        //     }
        // })
        Swal.fire({
            icon: "success",
            title: "重設密碼成功",
            text: ``,
        });
    } catch {}

    await new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });

    processing.value = false;
    fin.value = true;
}
</script>

<template>
    <!-- <h1 class="p-5">
        {{ $route.path }}
    </h1> -->
    <div class="w-full">
        <div class="m-auto flex w-full max-w-lg flex-col items-center justify-start px-4 pt-8">
            <transition name="up" mode="out-in">
                <span class="text-rainbow text-3xl sm:text-4xl lg:text-5xl">重設密碼</span>
            </transition>
            <transition name="fade" mode="out-in">
                <Input label="密碼" placeholder="請輸入新密碼" v-model="n_password" type="password" />
            </transition>
            <transition name="fade" mode="out-in">
                <div class="mt-8 w-full text-center text-xl">
                    <button
                        class="w-1/3 rounded bg-gradient-to-br from-cyan-500 via-indigo-500 to-fuchsia-500 p-2 px-4 text-white outline-none transition-all hover:hue-rotate-15 sm:w-1/4"
                        @click="() => submit()"
                    >
                        {{ processing ? "儲存中" : "儲存" }}
                    </button>
                </div>
            </transition>
            <div v-if="fin" class="text-rainbow mt-2 ml-1">已成功更新密碼！</div>
        </div>
    </div>
</template>
