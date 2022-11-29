<script lang="ts" setup>
import Swal from "sweetalert2";
import { EndpointRequestBody, POST } from "unicourse";
import uni from "../../../uni";

const route = useRoute();
const router = useRouter();

const placeholders = {
    Article: {
        title: "輸入標題 如：「演算法外系修課心得」",
        content: "分享你的經驗",
    },
    Question: {
        title: "輸入標題 如：「程式設計一可以旁聽嗎？」",
        content: "提出你的問題",
    },
    Announcement: {
        title: "",
        content: "",
    },
    Reply: {
        title: "",
        content: "",
    },
    Other: {
        title: "",
        content: "",
    },
};

const editing = ref(true);

const newPost = reactive<EndpointRequestBody<"posts", typeof POST>>({
    type: route.query.type === "Question" ? "Question" : "Article",
    title: "",
    content: "",
    tags: [],
    course: undefined,
});

const computedPost = computed(() => ({
    ...newPost,
    id: "",
    updated: new Date(),
    author_id: "",
    course_id: "",
    parent_id: "",
}));

const placeholder = computed(() => {
    if (newPost?.type) {
        return placeholders[newPost.type];
    } else {
        return placeholders.Other;
    }
});

function editOrNot() {
    editing.value = !editing.value;
}

async function save() {
    try {
        const post = await uni.req("posts", {
            method: "POST",
            body: newPost,
        });

        Swal.fire({
            icon: "success",
            title: "發布成功",
            text: "貼文已發布",
        });
        router.replace(`/forum/article/${post.id}`);
    } catch {}
}
</script>

<template>
    <div class="flex w-screen items-start justify-center p-4 text-lg lg:p-6">
        <div class="flex w-3/4 flex-col gap-y-4 text-blue-500">
            <div v-if="editing == true">
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
                    <Input label="標題" :placeholder="placeholder.title" v-model="newPost.title" />
                </div>

                <div class="my-2">
                    <label class="text-lg text-blue-500">
                        內容
                        <textarea
                            :placeholder="placeholder.content"
                            v-model="newPost.content"
                            rows="5"
                            class="w-full border-b-[3px] border-blue-300 p-2 outline-none transition-all duration-200 focus:border-indigo-500"
                        ></textarea>
                    </label>
                </div>
                <!-- 
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
            </div> -->

                <div>
                    <Input label="分類" placeholder="加上分類，讓文章更容易被看見" v-model="newPost.title" />
                </div>
            </div>
            <div v-else>
                <SoloForumArtical :post="computedPost" class="h-screen w-screen" />
            </div>
            <div class="mt-6 mb-32 flex gap-x-6">
                <div v-if="editing == true">
                    <button
                        class="break-normal bg-gray-100 px-2 text-blue-400 transition-all duration-200 hover:bg-gray-200 hover:text-lg hover:font-bold hover:text-fuchsia-400 sm:px-4"
                        @click="editOrNot"
                    >
                        預覽
                    </button>
                </div>
                <div v-else>
                    <button
                        class="break-normal bg-gray-100 px-2 text-blue-400 transition-all duration-200 hover:bg-gray-200 hover:text-lg hover:font-bold hover:text-fuchsia-400 sm:px-4"
                        @click="editOrNot"
                    >
                        編輯
                    </button>
                </div>
                <button
                    class="break-normal bg-gray-100 px-2 text-blue-400 transition-all duration-200 hover:bg-gray-200 hover:text-lg hover:font-bold hover:text-fuchsia-400 sm:px-4"
                    @click="save"
                >
                    發布
                </button>
            </div>
        </div>
    </div>
</template>
