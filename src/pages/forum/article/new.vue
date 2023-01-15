<script lang="ts" setup>
import { Post, PostType } from "@unicourse-tw/prisma";
import { posts } from "../../../api";
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();

const placeholders: Record<PostType, { title: string; content: string }> = {
    Article: {
        title: "輸入標題 如：「演算法外系修課心得」",
        content: "分享你的經驗",
    },
    Question: {
        title: "輸入標題 如：「程式設計一可以旁聽嗎？」",
        content: "提出你的問題",
    },
    Announcement: { title: "", content: "" },
    Reply: { title: "", content: "" },
    Other: { title: "", content: "" },
};

const newPost = reactive({
    type: (route.query.type === "question" ? PostType.Question : PostType.Article) as PostType,
    title: "",
    content: "",
    tags: [] as string[],
    // course: "",
});
const rawTagsInput = ref("");
watchEffect(() => {
    newPost.tags = rawTagsInput.value.split(" ");
});
const isWaiting = ref(false);

function submit() {
    isWaiting.value = true;
    posts
        .create(newPost)
        .then((post) => {
            Swal.fire({
                icon: "success",
                title: "發布成功",
                text: `文章發布成功！`,
            });
            router.push(`/forum/article/${post.id}`);
        })
        .catch(() => {
            // TODO: define error message to users
            Swal.fire({
                icon: "error",
                title: "發布失敗",
                text: "Unknown Error",
            });
        })
        .finally(() => {
            isWaiting.value = false;
        });
}
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
                        <option value="Article">文章</option>
                        <option value="Question">發問</option>
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

            <!-- <div class="my-2 flex flex-wrap gap-x-6">
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
            </div> -->

            <div>
                <Input label="分類　請以空白分隔多個分類（暫時）" placeholder="加上分類，讓文章更容易被看見" v-model="rawTagsInput" />
            </div>

            <div class="mt-6 mb-32 flex gap-x-6">
                <!-- <button
                    class="break-normal bg-gray-100 px-2 text-blue-400 transition-all duration-200 hover:bg-gray-200 hover:text-lg hover:font-bold hover:text-fuchsia-400 sm:px-4"
                >
                    預覽
                </button> -->
                <button
                    class="break-normal bg-gray-100 px-2 text-blue-400 transition-all duration-200 hover:bg-gray-200 hover:text-lg hover:font-bold hover:text-fuchsia-400 sm:px-4"
                    @click="submit"
                >
                    發布
                </button>
            </div>
        </div>
    </div>
</template>
