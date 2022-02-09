<script lang="ts" setup>
useHead({ title: "UniCourse" });

function open_external(url: string) {
    const win = window.open("", "_blank") as Window;
    win.location.href = url;
}
</script>

<template>
    <div class="absolute top-0 bg-gradient-to-r from-blue-300 via-indigo-200 to-fuchsia-200 pt-16">
        <div id="cover" class="top-0 m-auto w-screen lg:h-screen">
            <img src="../assets/banner_withText.svg" class="m-auto w-2/3 p-3 sm:p-5 lg:p-20" />
        </div>
        <div class="mx-auto h-4/5 w-full p-2 sm:h-2/5 sm:px-4 lg:w-2/3 lg:px-6">
            <div class="inline-block h-full w-1/2 pt-1 pr-2 sm:h-full sm:w-1/2 sm:pr-2 lg:h-full lg:w-1/2">
                <div class="h-full w-full rounded-lg bg-white bg-opacity-40 p-3 text-center shadow-lg transition-all hover:shadow-xl">
                    <span class="text-lg text-purple-700">目前有</span>
                    <span class="text-lg text-purple-700 sm:text-3xl"> 100 </span>
                    <span class="text-lg text-purple-700">位<br />使用者</span>
                    <img src="../assets/front/front0L.svg" class="inline-block h-1/2" />
                </div>
            </div>

            <div class="inline-block h-full w-1/2 pt-1 pl-2 sm:h-full sm:w-1/2 sm:pl-2 lg:h-full lg:w-1/2">
                <div class="h-full w-full rounded-lg bg-white bg-opacity-40 p-3 text-center shadow-lg transition-all hover:shadow-xl">
                    <span class="text-lg text-purple-700">累計了</span>
                    <span class="text-lg text-purple-700 sm:text-3xl"> 100 </span>
                    <span class="text-lg text-purple-700">篇<br />文章</span>
                    <img src="../assets/front/front0R.svg" class="inline-block h-1/2" />
                </div>
            </div>
        </div>
        <div class="mx-auto h-2/5 w-full p-2 sm:h-1/2 sm:px-4 lg:h-2/3 lg:w-2/3 lg:px-6">
            <div
                class="flex h-full w-full rounded-lg bg-white bg-opacity-40 px-3 py-6 text-center shadow-lg transition-all hover:shadow-xl"
            >
                <div class="inline-block h-full w-1/2 flex-1">
                    <img src="../assets/front/front01_transBG.svg" class="my-auto inline-block w-full" />
                </div>
                <div class="my-auto inline-block h-full w-1/2 flex-1">
                    <div class="m-auto p-3 sm:p-5 lg:p-5">
                        <span class="text-lg text-purple-700">找到你有興趣的課程資訊</span>
                    </div>
                    <router-link
                        to="/course"
                        class="h-10 w-32 rounded-md bg-purple-700 py-2.5 px-6 text-white transition-all hover:shadow-lg"
                        >搜尋課程</router-link
                    >
                </div>
            </div>
        </div>
        <div class="mx-auto h-2/5 w-full p-2 sm:h-1/2 sm:px-4 lg:h-2/3 lg:w-2/3 lg:px-6">
            <div
                class="flex h-full w-full rounded-lg bg-white bg-opacity-40 px-3 py-6 text-center shadow-lg transition-all hover:shadow-xl"
            >
                <div class="inline-block h-full w-1/2 flex-1">
                    <img src="../assets/front/front02_transBG.svg" class="my-auto inline-block w-full" />
                </div>
                <div class="my-auto inline-block h-full w-1/2 flex-1">
                    <div class="m-auto p-3 sm:p-5 lg:p-5">
                        <font color="#8242B5">回答他人提出的課程相關問題</font>
                    </div>
                    <router-link
                        to="/course"
                        class="h-10 w-32 rounded-md bg-purple-700 py-2.5 px-6 text-white transition-all hover:shadow-lg"
                        >解答疑問</router-link
                    >
                </div>
            </div>
        </div>
        <div class="mx-auto h-2/5 w-full p-2 sm:h-1/2 sm:px-4 lg:h-2/3 lg:w-2/3 lg:px-6">
            <div
                class="flex h-full w-full rounded-lg bg-white bg-opacity-40 px-3 py-6 text-center shadow-lg transition-all hover:shadow-xl"
            >
                <div class="inline-block h-full w-1/2 flex-1">
                    <img src="../assets/front/front03_transBG.svg" class="my-auto inline-block w-full" />
                </div>
                <div class="my-auto inline-block h-full w-1/2 flex-1">
                    <div class="m-auto p-3 sm:p-5 lg:p-5">
                        <font color="#8242B5">和其他人分享你的修課心得</font>
                    </div>
                    <router-link
                        to="/course"
                        class="h-10 w-32 rounded-md bg-purple-700 py-2.5 px-6 text-white transition-all hover:shadow-lg"
                        >撰寫心得</router-link
                    >
                </div>
            </div>
        </div>
        <div class="mx-auto h-1/4 w-full p-5 text-center lg:w-2/3">
            <font>加入我們 / find us<br /></font>
            <div class="mx-auto w-1/2">
                <button type="button" class="mx-auto w-1/4" @click="open_external('https://discord.gg/at3rvZ8QW7')">
                    <img src="../assets/front/dc_icon/dc_icon_grey.svg" class="mx-auto" />
                </button>
                <button type="button" class="mx-auto hidden w-1/4" onclick="location.href='FB連結'">
                    <img src="../assets/front/fb_icon/fb_icon_grey.svg" class="mx-auto" />
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* .divBox {
        background: green;
    } */
</style>
