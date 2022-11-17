<script lang="ts" setup>

useHead({ title: "忘記密碼 | UniCourse" });
const f_email = ref("");

</script>

<template>
    <!-- <h1 class="p-5">
        {{ $route.path }}
    </h1> -->
    <div class="w-full">
        <div class="m-auto flex w-full max-w-lg flex-col items-center justify-start px-4 pt-8">
            <transition name="up" mode="out-in">
                <span class="text-rainbow text-3xl sm:text-4xl lg:text-5xl">忘記密碼</span>
            </transition>
            <transition name="fade" mode="out-in">
                <Input label="信箱" placeholder="請輸入註冊信箱" v-model="f_email" />
            </transition>
        </div>
    </div>
</template>
