<script lang="ts" setup>
import { EndpointResponseBody, GET } from "unicourse";
import uni from "../uni";

useHead({ title: "UniCourse" });

const stats = reactive<{
    users: EndpointResponseBody<"stats/users">;
    posts: EndpointResponseBody<"stats/posts">;
    courses: EndpointResponseBody<"stats/courses">;
}>({
    users: {
        count: 0,
    },
    posts: {
        count: 0,
    },
    courses: {
        count: 0,
    },
});

init();

async function init() {
    Object.assign(stats.users, await uni.req("stats/users"));
    Object.assign(stats.posts, await uni.req("stats/posts"));
    Object.assign(stats.courses, await uni.req("stats/courses"));
}
</script>

<template>
    <div class="absolute top-0 bg-gradient-to-r from-blue-300 via-indigo-200 to-fuchsia-200 pt-16">
        <div id="cover" class="top-0 m-auto w-screen lg:h-screen">
            <img
                alt="UniCourse Logo"
                src="https://unicourse-tw.github.io/Public-Assets/banner/banner_withText.svg"
                class="m-auto mt-0 h-full w-full p-3 sm:p-5 lg:p-20"
            />
        </div>
        <div class="mx-auto h-4/5 w-full p-2 sm:h-2/5 sm:px-4 lg:w-2/3 lg:px-6">
            <div class="inline-block h-full w-1/2 pt-1 pr-2 sm:h-full sm:w-1/2 sm:pr-2 lg:h-full lg:w-1/2">
                <div
                    class="h-full w-full rounded-lg bg-white bg-opacity-40 p-3 text-center text-lg text-purple-700 shadow-lg transition-all hover:shadow-xl"
                >
                    目前有
                    <span class="sm:text-3xl"> {{ stats.users.count }} </span>
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
                    <span class="sm:text-3xl"> {{ stats.posts.count }} </span>
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
                    <Link to="/course" class="h-10 w-32 rounded-md bg-purple-700 py-2.5 px-6 text-white transition-all hover:shadow-lg">
                        搜尋課程</Link
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
                    <Link to="/forum" class="h-10 w-32 rounded-md bg-purple-700 py-2.5 px-6 text-white transition-all hover:shadow-lg">
                        解答疑問</Link
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
                    <Link to="/forum" class="h-10 w-32 rounded-md bg-purple-700 py-2.5 px-6 text-white transition-all hover:shadow-lg">
                        撰寫心得</Link
                    >
                </div>
            </div>
        </div>
        <!-- <div class="mx-auto h-1/4 w-full p-5 text-center lg:w-2/3">
            <span>加入我們 / find us</span>
            <br />
            <Link class="mx-auto" aria-label="Join Our Discord Server" to="https://discord.gg/gMXEn97CkN" :icon="false">
            <i-ion-logo-discord class="m-2 mx-auto h-8 w-8 text-purple-700" />
            </Link>
        </div> -->
        <div class="underspace">
            <span>加入我們 / find us</span>
            <br />
            <div class="flex">
                <Link class="mx-auto" aria-label="Join Our FaceBook Server" to="https://www.facebook.com/unicourse.tw" :icon="false">
                    <i-ion-logo-facebook
                        class="m-2 mx-auto h-8 w-8 text-blue-500 duration-200 file:transition-all hover:scale-125 hover:text-blue-800"
                    />
                </Link>
                <Link
                    class="mx-auto"
                    aria-label="Join Our Instagram Server"
                    to="https://www.instagram.com/unicourse.tw/?igshid=YmMyMTA2M2Y="
                    :icon="false"
                >
                    <i-ion-logo-instagram
                        class="m-2 mx-auto h-8 w-8 text-pink-400 duration-200 file:transition-all hover:scale-125 hover:text-rose-700"
                    />
                </Link>
                <Link class="mx-auto" aria-label="Join Our Discord Server" to="https://discord.gg/gMXEn97CkN" :icon="false">
                    <i-ion-logo-discord
                        class="m-2 mx-auto h-8 w-8 text-purple-600 duration-200 file:transition-all hover:scale-125 hover:text-purple-800"
                    />
                </Link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.underspace {
    bottom: 0%;
    margin-top: 5%;
    width: 100vw;
    height: 17vh;
    text-align: center;
    line-height: 7vh;
    background: #e2e4fd;
    /* background: linear-gradient(90deg, #f5d0fe, rgb(199, 210, 254), rgb(199, 210, 254), rgb(147, 197, 253)); */
    box-shadow: 0 0 20px rgb(176, 187, 222);
}
</style>
