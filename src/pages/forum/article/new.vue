<script lang="ts" setup>
import type { PostForm } from "../../../types";

const route = useRoute();

const placeholders = {
    review: {
        title: "輸入標題 如：「演算法外系修課心得」",
        content: "分享你的經驗",
    },
    question: {
        title: "輸入標題 如：「程式設計一可以旁聽嗎？」",
        content: "提出你的問題",
    },
    others: {
        title: "",
        content: "",
    },
};

const newPost = reactive<PostForm>({
    type: route.query.type === "question" ? "question" : "review",
    title: "",
    content: "",
    tags: [],
    course: {
        year: 0,
        term: 0,
        serial: 0,
        name: "",
        teacher: "",
        rating: {
            sweetness: 0,
            easiness: 0,
            usefulness: 0,
        },
    },
});
</script>

<template>
    <div class="flex w-screen items-start justify-center p-4 text-lg lg:p-6">
        <div class="flex w-3/4 flex-col gap-y-4 text-blue-500">
            <div class="my-2">
                <label class="text-lg text-blue-500">
                    類型
                    <br />
                    <select
                        v-model="newPost.type"
                        class="w-full border-b-[3px] border-blue-300 p-2 outline-none transition-all duration-200 focus:border-indigo-500"
                    >
                        <option value="review">文章</option>
                        <option value="question">發問</option>
                    </select>
                </label>
            </div>

            <div>
                <Input label="課程" placeholder="搜尋並選擇你所討論的課程" />
            </div>

            <div>
                <Input label="標題" :placeholder="placeholders[newPost.type].title" v-model="newPost.title" />
            </div>

            <div class="my-2">
                <label class="text-lg text-blue-500">
                    內容
                    <textarea
                        :placeholder="placeholders[newPost.type].content"
                        v-model="newPost.content"
                        rows="5"
                        class="w-full border-b-[3px] border-blue-300 p-2 outline-none transition-all duration-200 focus:border-indigo-500"
                    ></textarea>
                </label>
            </div>

            <div class="my-2 flex flex-wrap gap-x-6">
                <div>
                    <span class="mr-2">甜度</span>
                    <Rating v-model="newPost.course.rating.sweetness" />
                </div>
                <div>
                    <span class="mr-2">涼度</span>
                    <Rating v-model="newPost.course.rating.easiness" />
                </div>
                <div>
                    <span class="mr-2">實用度</span>
                    <Rating v-model="newPost.course.rating.usefulness" />
                </div>
            </div>

            <div>
                <Input label="分類" placeholder="加上分類，讓文章更容易被看見" v-model="newPost.title" />
            </div>

            <div class="mt-6 mb-32 flex gap-x-6">
                <button
                    class="break-normal bg-gray-100 px-2 text-blue-400 transition-all duration-200 hover:bg-gray-200 hover:text-lg hover:font-bold hover:text-fuchsia-400 sm:px-4"
                >
                    預覽
                </button>
                <button
                    class="break-normal bg-gray-100 px-2 text-blue-400 transition-all duration-200 hover:bg-gray-200 hover:text-lg hover:font-bold hover:text-fuchsia-400 sm:px-4"
                >
                    發布
                </button>
            </div>
        </div>
    </div>
</template>
