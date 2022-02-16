<script lang="ts" setup>
useHead({ title: "UniCourse" });
</script>

<template>
    <div class="absolute top-0 bg-gradient-to-r from-blue-300 via-indigo-200 to-fuchsia-200 pt-16">
        <div id="cover" class="top-0 m-auto w-screen lg:h-screen">
            <img alt="UniCourse Logo" src="../assets/banner_withText.svg" class="m-auto w-2/3 p-3 sm:p-5 lg:p-20" />
        </div>
        <div class="mx-auto h-4/5 w-full p-2 sm:h-2/5 sm:px-4 lg:w-2/3 lg:px-6">
            <div class="inline-block h-full w-1/2 pt-1 pr-2 sm:h-full sm:w-1/2 sm:pr-2 lg:h-full lg:w-1/2">
                <div
                    class="h-full w-full rounded-lg bg-white bg-opacity-40 p-3 text-center text-lg text-purple-700 shadow-lg transition-all hover:shadow-xl"
                >
                    目前有
                    <span class="sm:text-3xl"> {{ 100 }} </span>
                    位
                    <br />
                    使用者
                    <img alt="Community" src="../assets/front/front0L.svg" class="inline-block h-full" />
                </div>
            </div>

            <div class="inline-block h-full w-1/2 pt-1 pl-2 sm:h-full sm:w-1/2 sm:pl-2 lg:h-full lg:w-1/2">
                <div
                    class="h-full w-full rounded-lg bg-white bg-opacity-40 p-3 text-center text-lg text-purple-700 shadow-lg transition-all hover:shadow-xl"
                >
                    累計了
                    <span class="sm:text-3xl"> {{ 100 }} </span>
                    篇
                    <br />
                    文章
                    <img alt="Articles" src="../assets/front/front0R.svg" class="inline-block h-full" />
                </div>
            </div>
        </div>
        <div class="mx-auto h-2/5 w-full p-2 sm:h-1/2 sm:px-4 lg:h-2/3 lg:w-2/3 lg:px-6">
            <div
                class="flex h-full w-full rounded-lg bg-white bg-opacity-40 px-3 py-6 text-center shadow-lg transition-all hover:shadow-xl"
            >
                <div class="inline-block h-full w-1/2 flex-1">
                    <img alt="Find Course" src="../assets/front/front01_transBG.svg" class="my-auto inline-block w-full" />
                </div>
                <div class="my-auto inline-block h-full w-1/2 flex-1">
                    <div class="m-auto p-3 sm:p-5 lg:p-5">
                        <span class="text-lg text-purple-700">找到你有興趣的<br class="sm:hidden" />課程資訊</span>
                    </div>
                    <Link to="/course" class="h-10 w-32 rounded-md bg-purple-700 py-2.5 px-6 text-white transition-all hover:shadow-lg"
                        >搜尋課程</Link
                    >
                </div>
            </div>
        </div>
        <div class="mx-auto h-2/5 w-full p-2 sm:h-1/2 sm:px-4 lg:h-2/3 lg:w-2/3 lg:px-6">
            <div
                class="flex h-full w-full rounded-lg bg-white bg-opacity-40 px-3 py-6 text-center shadow-lg transition-all hover:shadow-xl"
            >
                <div class="inline-block h-full w-1/2 flex-1">
                    <img alt="Answer Question" src="../assets/front/front02_transBG.svg" class="my-auto inline-block w-full" />
                </div>
                <div class="my-auto inline-block h-full w-1/2 flex-1">
                    <div class="m-auto p-3 sm:p-5 lg:p-5">
                        <span class="text-lg text-purple-700">回答他人提出的<br class="sm:hidden" />課程相關問題</span>
                    </div>
                    <Link to="/forum" class="h-10 w-32 rounded-md bg-purple-700 py-2.5 px-6 text-white transition-all hover:shadow-lg"
                        >解答疑問</Link
                    >
                </div>
            </div>
        </div>
        <div class="mx-auto h-2/5 w-full p-2 sm:h-1/2 sm:px-4 lg:h-2/3 lg:w-2/3 lg:px-6">
            <div
                class="flex h-full w-full rounded-lg bg-white bg-opacity-40 px-3 py-6 text-center shadow-lg transition-all hover:shadow-xl"
            >
                <div class="inline-block h-full w-1/2 flex-1">
                    <img alt="Share Review" src="../assets/front/front03_transBG.svg" class="my-auto inline-block w-full" />
                </div>
                <div class="my-auto inline-block h-full w-1/2 flex-1">
                    <div class="m-auto p-3 sm:p-5 lg:p-5">
                        <span class="text-lg text-purple-700">和其他人分享你的<br class="sm:hidden" />修課心得</span>
                    </div>
                    <Link to="/forum" class="h-10 w-32 rounded-md bg-purple-700 py-2.5 px-6 text-white transition-all hover:shadow-lg"
                        >撰寫心得</Link
                    >
                </div>
            </div>
        </div>
        <div class="mx-auto h-1/4 w-full p-5 text-center lg:w-2/3">
            <span>加入我們 / find us</span>
            <br />
            <div class="mx-auto w-1/2">
                <Link class="mx-auto w-1/4" aria-label="Join Our Discord Server" to="https://discord.gg/gMXEn97CkN" :icon="false">
                    <img alt="Discord Icon" src="../assets/front/dc_icon/dc_icon_grey.svg" loading="lazy" class="mx-auto" />
                </Link>
            </div>
        </div>
    </div>
</template>
