<script lang="ts" setup>
useHead({ title: "UniCourse" });
</script>

<template>
    <div id="cover" class="absolute top-0 h-screen w-screen bg-gradient-to-br from-cyan-400 via-indigo-200 to-fuchsia-200">
        <img src="../assets/banner.svg" class="h-1/5 w-full sm:h-1/4 lg:h-1/3" />
        <div class="h-4/5 w-full p-2 sm:h-3/4 sm:px-4 lg:h-2/3 lg:px-6">
            <div class="inline-block h-1/2 w-full pb-1 sm:pb-2 lg:h-full lg:w-1/2 lg:pr-3">
                <div class="h-full w-full rounded-lg bg-white bg-opacity-40 p-3 text-center shadow-lg transition-all hover:shadow-xl">
                    <span class="text-rainbow text-2xl"> 最完整的課程資訊 </span>
                    <hr class="mx-auto my-1.5 h-0.5 w-3/4 border-none bg-gradient-to-r from-cyan-600 via-indigo-600 to-fuchsia-600" />
                    <p>多少課程？ 從哪些平台整合？ 總共被查詢了多少次？ 其他數據？</p>
                </div>
            </div>
            <div class="inline-block h-1/2 w-full pt-1 sm:pt-2 lg:h-full lg:w-1/2 lg:pl-3">
                <div class="h-full w-full rounded-lg bg-white bg-opacity-40 p-3 text-center shadow-lg transition-all hover:shadow-xl">
                    <span class="text-rainbow text-2xl"> 廣大的使用者社群 </span>
                    <hr class="mx-auto my-1.5 h-0.5 w-3/4 border-none bg-gradient-to-r from-cyan-600 via-indigo-600 to-fuchsia-600" />
                    <p>多少人使用？ 有多少文章？ 有多少提問已被回答？ 其他數據？</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
