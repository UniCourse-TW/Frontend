<script lang="ts" setup>
import type { CourseInfo, CourseListFilter, CourseMeta, CourseTypeListFilter, ArticleTypeListFilter } from "../../types";
import type { PostMeta } from "../../types";
import { posts, courses } from "../../api";
import SearchBar from "../../components/SearchBar.vue";
useHead({ title: "論壇 | UniCourse" });

const holders = ["甜課", "資工系", "獨角獸", "設計", "老師人很好", "作業好多"];
const warnings = {
    num: "只可以有數字！",
    num_letter: "只可以有數字和英文字母！",
    compare: "必須是比較格式：<=, >=, <, >, = 加上數字！",
    range: "必須是範圍格式：數字間以「,」或「-」隔開！",
};

const advanced_search: [string, string, string, string, (v: string) => boolean][] = [
    ["系所", "department", "資工", "", () => true],
    ["教師", "teacher", "紀", "", () => true],
    ["課程名稱", "title", "程式設計", "", () => true],
    ["科目代碼", "code", "CSU0002", warnings.num_letter, (v: string) => !v.match(/[^\w\d]/)],
    ["開課學年度", "year", "110", warnings.num, (v: string) => !v.match(/\D/)],
    ["開課學期", "term", "2", warnings.num, (v: string) => !v.match(/\D/)],
    ["學分學程", "program", "音樂科技", "", () => true],

    /*    
     ["開課序號", "serial", "2949", warnings.num, (v: string) => !v.match(/\D/)],
     ["標籤", "tag", "UX", "", () => true],
     ["通識領域", "general", "人文", "", () => true],
        ["綜合評分", "rating", ">4.5", warnings.compare, is_compare],
        ["實用性", "usefulness", ">4", warnings.compare, is_compare],
        ["甜度", "sweetness", ">4", warnings.compare, is_compare],
        ["涼度", "easiness", ">4", warnings.compare, is_compare],
        ["週幾授課", "day", "1", warnings.range, (v: string) => !v.match(/[^\d-,]/)],
        ["節數時段", "session", "1-2", warnings.range, (v: string) => !v.match(/[^\d-,]/)],
        ["地點", "location", "公館", "", () => true],
        ["名額", "quota", ">10", warnings.compare, is_compare],
        ["評分方法", "grading", "作業>49", warnings.compare, (v: string) => !v.split(/>|<|>=|<=|!|=/)[1].match(/\D/)],
        ["實際授課時數", "hours", "<3", warnings.compare, is_compare],
        ["教學方法", "methodology", "講述法", "", () => true],
        ["先修課程", "prerequisite", "程式設計（一）", "", () => true],
        */
];
// #endregion

const course_type_search: [string, string, string, string, (v: string) => boolean][] = [
    ["必修", "required", "", "", () => true],
    ["選修", "elective", "", "", () => true],
    ["通識", "general", "", "", () => true],
    ["其他", "others", "", "", () => true],
];

const article_type_search: [string, string, string, string, (v: string) => boolean][] = [
    ["公告", "announcement", "", "", () => true],
    ["文章", "review", "", "", () => true],
    ["提問", "question", "", "", () => true],
];

const query_results = reactive(<CourseMeta[]>[]);
const prev_length = ref(0);
const searching = ref(false);
const first = ref(true);
const adv = ref(false);
const detail_course = ref(<CourseInfo | null>{});

const advanced_values = reactive(<{ [key: string]: string }>{
    department: "",
    teacher: "",
    title: "",
    code: "",
    serial: "",
    year: "",
    term: "",
    tag: "",
    program: "",
    general: "",
    rating: "",
    usefulness: "",
    sweetness: "",
    easiness: "",
    day: "",
    session: "",
    location: "",
    quota: "",
    grading: "",
    hours: "",
    methodology: "",
    prerequisite: "",
});

const sort = reactive({
    by: "default" as CourseListFilter,
    desc: false,
});

const course_type = reactive({
    by: "default" as CourseTypeListFilter,
    desc: false,
});

const article_type = reactive({
    by: "default" as ArticleTypeListFilter,
    desc: false,
});

function rand_placeholder(): string {
    return holders[Math.floor(Math.random() * holders.length)];
}

async function query() {
    if (searching.value) return;
    searching.value = true;
    try {
        for (let i = 0; i < advanced_search.length; i++) {
            if (!validate(advanced_values[advanced_search[i][1]], advanced_search[i][4])) {
                throw {
                    title: "進階搜尋錯誤",
                    message: `欄位「${advanced_search[i][0]}」的輸入不符格式！`,
                };
            }
        }

        prev_length.value = query_results.length;
        query_results.splice(0, query_results.length);
        const q = (
            query_body.value +
            " " +
            Object.entries(advanced_values).reduce((acc, [key, value]) => {
                if (value) acc += `${key}:${value.replace(/\s/g, "")} `;
                return acc;
            }, "")
        ).trim();
        const list = await courses.list({
            q,
            limit: 100,
            offset: 0,
            sort: sort.by,
            course_type: course_type.by,
            article_type: article_type.by,
            desc: sort.desc,
        });
        query_results.push(...list);
        nextTick(() => {
            if (query_results.length && adv.value) {
                const elm = document.querySelector("#scroll-anchor") as HTMLElement;
                elm.scrollIntoView({ block: "start", behavior: "smooth" });
            }
        });
    } catch (e) {
        console.error(e);
    } finally {
        searching.value = false;
        first.value = false;
    }
}

function is_compare(v: string): boolean {
    return !!v.match(/^(>|<|>=|<=|!|=)?\d+$/);
}

// async function show(key: string) {
//     detail_course.value = await courses.info(key);
// }

function validate(val: string, func: (v: string) => boolean): boolean {
    return val === "" || func(val);
}
const router = useRouter();

const query_body = ref("");
const latest_questions = reactive(<PostMeta[]>[]);
const latest_posts = reactive(<PostMeta[]>[]);
const latest_annoucement = reactive(<PostMeta[]>[]);
const is_fetching = ref(true);

posts
    .get_latest()
    .then((data) => {
        latest_questions.splice(0, latest_questions.length, ...data.filter((e) => e.type === "question"));
        latest_posts.splice(0, latest_posts.length, ...data.filter((e) => e.type !== "question"));
    })
    .catch(console.error)
    .finally(() => {
        // for demo purpose, temporarily extend the duration of loading
        setTimeout(() => (is_fetching.value = false), 1000);
        // is_fetching.value = false;
    });

// function query() {
//     router.push({ path: "/forum/search", query: { q: query_body.value } });
// }

const post_animation = {
    before_enter(el: Element) {
        const elm = el as HTMLElement;
        elm.style.opacity = "0";
        elm.style.top = "-2rem";
        elm.style.transition = "all 0.25s";
    },
    enter(el: Element, done: () => void) {
        const elm = el as HTMLElement;
        const idx = +(elm.dataset.idx || "0");
        setTimeout(() => {
            elm.style.opacity = "1";
            elm.style.top = "0";
            setTimeout(done, 250);
        }, idx * (latest_posts.length < 300 ? 50 : 1500 / latest_posts.length));
    },
    leave(el: Element, done: () => void) {
        const elm = el as HTMLElement;
        elm.style.opacity = "0";
        setTimeout(done, 50);
    },
};
const course_animation = {
    before_enter(el: Element) {
        const elm = el as HTMLElement;
        elm.style.opacity = "0";
        elm.style.top = "-2rem";
        elm.style.transition = "all 0.25s";
    },
    enter(el: Element, done: () => void) {
        const elm = el as HTMLElement;
        const idx = +(elm.dataset.idx || "0");
        setTimeout(() => {
            elm.style.opacity = "1";
            elm.style.top = "0";
            setTimeout(done, 250);
        }, idx * (query_results.length < 300 ? 50 : 1500 / query_results.length));
    },
    leave(el: Element, done: () => void) {
        const elm = el as HTMLElement;
        setTimeout(() => {
            elm.style.opacity = "0";
            elm.style.top = "-2rem";
            setTimeout(done, 150);
        }, 100 / prev_length.value);
    },
};
</script>

<template>
    <div>
        <SearchBar
            v-model="query_body"
            :search="query"
            :advanced="() => (adv = !adv)"
            :placeholder="'搜尋文章 試試「' + rand_placeholder() + '」？'"
        />
        <AniFade direction="up">
            <div v-if="adv" class="m-auto mb-4 flex max-w-7xl justify-center px-6 lg:px-10">
                <div class="w-full rounded border bg-gray-50 p-2 lg:rounded-lg lg:p-4">
                    <h2 class="font-bold">進階搜尋</h2>
                    <div class="mt-4 grid grid-cols-[7rem_auto]">
                        <div class="flex items-center justify-end text-right text-blue-500">文章類別</div>
                        <select
                            v-model="article_type.by"
                            class="m-2 w-full cursor-pointer appearance-none border-b-[3px] border-blue-300 bg-transparent p-2 text-indigo-500 outline-none transition-all duration-200 focus:border-indigo-500"
                        >
                            <option value="default">不限</option>
                            <option v-for="[title, type] of article_type_search" :key="(type as string)" :value="type">
                                {{ title }}
                            </option>
                        </select>
                    </div>
                    <div class="mx-2 max-h-[calc(100vh-12rem)] overflow-y-auto overflow-x-hidden">
                        <div
                            v-for="[title, type, placeholder, warning, validator] of advanced_search"
                            :key="(type as string)"
                            class="grid grid-cols-[7rem_auto]"
                        >
                            <div
                                :class="[
                                    'mt-2 text-right transition-colors lg:mt-4',
                                    advanced_values[type].length ? 'text-blue-500' : 'text-blue-300',
                                ]"
                            >
                                {{ title }}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    :placeholder="'例如：' + (placeholder as string)"
                                    :class="[
                                        'm-2 mt-0 w-full border-b-[3px] bg-transparent p-2 outline-none transition-all duration-200 lg:mt-2 ',
                                        validate(advanced_values[type], validator)
                                            ? 'border-blue-300 text-blue-500 focus:border-indigo-500 focus:text-indigo-500'
                                            : 'border-red-500 text-red-500',
                                    ]"
                                    :value="advanced_values[type]"
                                    @input="(evt) => {
    (evt.target as HTMLInputElement).value = (evt.target as HTMLInputElement).value.replace(/\s/g, '');
    advanced_values[type] = (evt.target as HTMLInputElement).value;
}"
                                    @keyup.enter="query"
                                />
                                <AniFade direction="left">
                                    <p v-if="!validate(advanced_values[type], validator)" class="m-2 w-full text-red-500">
                                        {{ warning }}（例如：{{ placeholder }}）
                                    </p>
                                </AniFade>
                            </div>
                        </div>
                        <div class="mt-4 grid grid-cols-[7rem_auto]">
                            <div class="flex items-center justify-end text-right text-blue-500">課程類別</div>
                            <select
                                v-model="course_type.by"
                                class="m-2 w-full cursor-pointer appearance-none border-b-[3px] border-blue-300 bg-transparent p-2 text-indigo-500 outline-none transition-all duration-200 focus:border-indigo-500"
                            >
                                <option value="default">不限</option>
                                <option v-for="[title, type] of course_type_search" :key="(type as string)" :value="type">
                                    {{ title }}
                                </option>
                            </select>
                        </div>
                        <div class="mt-4 grid grid-cols-[7rem_auto]">
                            <div class="flex items-center justify-end text-right text-blue-500">排序方式</div>
                            <select
                                v-model="sort.by"
                                class="m-2 w-full cursor-pointer appearance-none border-b-[3px] border-blue-300 bg-transparent p-2 text-indigo-500 outline-none transition-all duration-200 focus:border-indigo-500"
                            >
                                <option value="default">自動排序</option>
                                <option v-for="[title, type] of advanced_search" :key="(type as string)" :value="type">
                                    {{ title }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-else-if="!adv && (Object.values(advanced_values).join('').replace(/\s/g, '').length || sort.by !== 'default')"
                class="m-auto max-w-7xl p-2 text-sm text-gray-500 sm:px-6 lg:px-10"
            >
                <span v-if="Object.values(advanced_values).join('').replace(/\s/g, '').length">已啟用進階搜尋！</span>
                <span v-if="sort.by !== 'default'">排序方式： {{ advanced_search.find((v) => v[1] === sort.by)?.[0] }}</span>
            </div>
        </AniFade>

        <!-- <div id="scroll-anchor" class="-top-20"></div> -->

        <div class="w-full">
            <div
                v-show="query_results.length === 0 && !first && !searching"
                class="p2 m-auto flex w-full max-w-[1400px] items-center justify-center sm:p-4 lg:p-6"
            >
                <div class="h-40 w-full rounded bg-white p-4 text-center sm:p-5 lg:p-6">
                    <span class="text-xl">
                        <i-octicon-x-circle-16 class="m-1 inline sm:animate-bounce" />
                        <br class="sm:hidden" />
                        查無結果，換個關鍵字試試？
                        <br class="sm:hidden" />
                        例如「{{ rand_placeholder() }}」
                        <i-octicon-milestone-16 class="m-1 hidden animate-bounce sm:inline" />
                    </span>
                </div>
            </div>
            <div v-show="searching" class="p2 m-auto flex w-full max-w-[1400px] items-center justify-center sm:p-4 lg:p-6">
                <div class="h-40 w-full rounded bg-white p-4 text-center sm:p-5 lg:p-6">
                    <span class="animate-pulse text-xl">
                        <i-octicon-search class="m-1 inline animate-bounce" />
                        查詢中...
                    </span>
                </div>
            </div>
        </div>

        <div class="articleSort m-auto grid max-w-[2000px] grid-cols-1 gap-y-8 px-4 lg:grid-cols-1">
            <!-- remove class:  lg:divide-x-2 lg:divide-blue-200-->
            <div class="px-4 lg:px-6">
                <div class="flex justify-between">
                    <h2 class="text-lg lg:text-xl">公告</h2>
                    <!-- <button
                        class="break-normal bg-gray-100 px-2 text-blue-400 transition-all duration-200 hover:bg-gray-200 hover:text-lg hover:font-bold hover:text-fuchsia-400 sm:px-4"
                        @click="router.push('/forum/article/new?type=question')">
                        <span>我要發問</span>
                    </button> -->
                </div>
                <div class="w-full">
                    <transition-group
                        name="course-list"
                        :css="false"
                        @before-enter="post_animation.before_enter"
                        @enter="post_animation.enter"
                        @leave="post_animation.leave"
                    >
                        <div v-if="is_fetching" class="my-4">
                            <ForumMetaCard is_loading />
                        </div>
                        <div
                            v-else-if="latest_annoucement.length"
                            v-for="(meta, idx) of latest_annoucement"
                            :key="meta.id"
                            :data-idx="idx"
                            class="my-4"
                        >
                            <ForumMetaCard :meta="meta" />
                        </div>
                        <div v-else>
                            <div class="my-8 rounded border border-gray-300 p-8">目前沒有公告</div>
                        </div>
                    </transition-group>
                </div>
            </div>
            <div class="px-4 lg:px-6">
                <div class="flex justify-between">
                    <h2 class="text-lg lg:text-xl">最新貼文</h2>
                    <!-- <button
                        class="break-normal bg-gray-100 px-2 text-blue-400 transition-all duration-200 hover:bg-gray-200 hover:text-lg hover:font-bold hover:text-fuchsia-400 sm:px-4"
                        @click="router.push('/forum/article/new')">
                        <span>我要發文</span>
                    </button> -->
                </div>
                <div class="w-full">
                    <transition-group
                        name="course-list"
                        :css="false"
                        @before-enter="post_animation.before_enter"
                        @enter="post_animation.enter"
                        @leave="post_animation.leave"
                    >
                        <div v-if="is_fetching" class="my-4">
                            <ForumMetaCard is_loading />
                        </div>
                        <div
                            v-else-if="latest_posts.length"
                            v-for="(meta, idx) of latest_posts"
                            :key="meta.id"
                            :data-idx="idx"
                            class="my-4"
                        >
                            <ForumMetaCard :meta="meta" />
                        </div>
                        <div v-else>
                            <div class="my-8 rounded border border-gray-300 p-8">目前沒有新文章/新提問</div>
                        </div>
                        <!-- <div v-else-if="latest_questions.length" v-for="(meta, idx) of latest_questions" :key="meta.id"
                            :data-idx="idx" class="my-4">
                            <ForumMetaCard :meta="meta" />
                        </div> -->
                    </transition-group>
                </div>
            </div>

            <button
                class="newPostBtn bg-gray-100 px-2 text-blue-400 duration-200 file:transition-all hover:bg-gray-200 hover:text-lg hover:font-bold hover:text-fuchsia-400"
                @click="router.push('/forum/article/new')"
            >
                <span>我要發文</span>
            </button>
            <button
                class="newQuesionBtn bg-gray-100 px-2 text-blue-400 transition-all duration-200 hover:bg-gray-200 hover:text-lg hover:font-bold hover:text-fuchsia-400"
                @click="router.push('/forum/article/new?type=question')"
            >
                <span>我要發問</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
.articleSort {
    margin-left: 10%;
    margin-right: 10%;
}

.newPostBtn {
    position: fixed;
    bottom: 10%;
    right: 13%;
    height: 8%;
    width: 8%;
    border-radius: 100px;
}

.newQuesionBtn {
    position: fixed;
    bottom: 10%;
    right: 4%;
    height: 8%;
    width: 8%;
    border-radius: 100px;
}
</style>
