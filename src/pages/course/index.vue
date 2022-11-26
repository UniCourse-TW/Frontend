<script lang="ts" setup>
import uni from "../../uni";
import SearchBar from "../../components/SearchBar.vue";
import { Course } from "@unicourse-tw/prisma";
import Swal from "sweetalert2";

useHead({ title: "課程查詢 | UniCourse" });

const keyword = ref("");
const query_results = reactive(<Course[]>[]);
const prev_length = ref(0);
const first = ref(true);
const adv = ref(false);
const detail_course = ref({});

const advanced_values: Record<string, string> = reactive({
    name: "",
    teacher: "",
    provider: "",
    code: "",
    program: "",
    term: "",
});

const title: Record<string, string> = {
    name: "課程名稱",
    teacher: "教師名稱",
    provider: "提供組織",
    code: "課程代碼",
    program: "學程",
    term: "學期",
};

const type = ref("");
const course_types = [
    ["必修", "Compulsory"],
    ["選修", "Elective"],
    ["通識", "General"],
    ["其他", "Other"],
];

const sorting = ref("");
const sorting_options = [
    ["名稱", "name"],
    ["課程代碼", "code"],
    ["學分數", "credit"],
    ["年度", "year"],
    ["課程類別", "type"],
    ["教師數量", "teachers"],
    ["學程數量", "programs"],
    ["擋修數量", "prerequisites"],
];

function rand_placeholder(): string {
    const placeholders = ["紀博文", "資工系", "程式設計", "資料結構", "演算法", "數值方法"];
    return placeholders[Math.floor(Math.random() * placeholders.length)];
}

const searching = ref(false);
const limit = 20;
const offset = ref(0);

async function query() {
    if (searching.value) {
        return;
    }
    searching.value = true;

    try {
        prev_length.value = query_results.length;
        query_results.splice(0, query_results.length);

        let q = (
            keyword.value +
            Object.entries(advanced_values).reduce((acc, [key, value]) => {
                return value ? acc + ` ${key}:"${value.replace(/\s/g, "")}"` : acc;
            }, "")
        ).trim();

        if (type.value) {
            q += ` type:"${type.value}"`;
        }

        if (sorting.value) {
            q += ` order:${sorting.value}`;
        }

        if (q.length === 0) {
            Swal.fire({
                icon: "error",
                title: "請輸入關鍵字",
                text: "請輸入至少一個關鍵字",
            });
            throw new Error("No keyword");
        }

        const list = await uni.req("courses", {
            method: "GET",
            body: { q, offset: offset.value },
        });
        query_results.push(...list);
        nextTick(() => {
            if (query_results.length && adv.value) {
                const elm = document.querySelector<HTMLDivElement>("#scroll-anchor");
                elm?.scrollIntoView({ block: "start", behavior: "smooth" });
            }
        });
    } catch {}

    searching.value = false;
    first.value = false;
}

function prev_page() {
    offset.value = Math.max(0, offset.value - limit);
    query();
}

function next_page() {
    offset.value = offset.value + limit;
    query();
}

async function show(key: string) {
    // detail_course.value = await uni.req("courses", {
    //     method: "POST",
    //     body: {
    //         q: key,
    //     },
    // });
}

/**
 * Animations for course card list
 */
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
        <div>
            <SearchBar
                v-model="keyword"
                :search="query"
                :advanced="() => (adv = !adv)"
                :placeholder="'搜尋課程 試試「' + rand_placeholder() + '」？'"
            />

            <AniFade direction="up">
                <div v-if="adv" class="m-auto mb-4 flex max-w-7xl justify-center px-6 lg:px-10">
                    <div class="w-full rounded border bg-gray-50 p-2 lg:rounded-lg lg:p-4">
                        <h2 class="font-bold">進階搜尋</h2>
                        <div class="mx-2 max-h-[calc(100vh-12rem)] overflow-y-auto overflow-x-hidden">
                            <div v-for="key in Object.keys(advanced_values)" :key="key" class="grid grid-cols-[7rem_auto]">
                                <div
                                    :class="[
                                        'mt-2 text-right transition-colors lg:mt-4',
                                        advanced_values[key]?.length ? 'text-blue-500' : 'text-blue-300',
                                    ]"
                                >
                                    {{ title[key] }}
                                </div>
                                <div>
                                    <Input v-model="advanced_values[key]" />
                                </div>
                            </div>
                            <div class="mt-4 grid grid-cols-[7rem_auto]">
                                <div class="flex items-center justify-end text-right text-blue-500">課程類別</div>
                                <select
                                    v-model="type"
                                    class="m-2 w-full cursor-pointer appearance-none border-b-[3px] border-blue-300 bg-transparent p-2 text-indigo-500 outline-none transition-all duration-200 focus:border-indigo-500"
                                >
                                    <option value="">不限</option>
                                    <option v-for="[name, type] of course_types" :key="type" :value="type">
                                        {{ name }}
                                    </option>
                                </select>
                            </div>
                            <div class="mt-4 grid grid-cols-[7rem_auto]">
                                <div class="flex items-center justify-end text-right text-blue-500">排序方式</div>
                                <select
                                    v-model="sorting"
                                    class="m-2 w-full cursor-pointer appearance-none border-b-[3px] border-blue-300 bg-transparent p-2 text-indigo-500 outline-none transition-all duration-200 focus:border-indigo-500"
                                >
                                    <option value="">自動排序</option>
                                    <option v-for="[name, type] of sorting_options" :key="type" :value="type">
                                        {{ name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-else-if="!adv && (Object.values(advanced_values).join('').replace(/\s/g, '').length || sorting !== '')"
                    class="m-auto max-w-7xl p-2 text-sm text-gray-500 sm:px-6 lg:px-10"
                >
                    <span v-if="Object.values(advanced_values).join('').replace(/\s/g, '').length">已啟用進階搜尋！</span>
                    <span v-if="sorting !== ''">排序方式： {{ sorting_options.find((v) => v[1] === sorting)?.[0] }}</span>
                </div>
            </AniFade>

            <div id="scroll-anchor" class="-top-20"></div>

            <div class="w-full">
                <transition-group
                    name="course-list"
                    :css="false"
                    @before-enter="course_animation.before_enter"
                    @enter="course_animation.enter"
                    @leave="course_animation.leave"
                >
                    <div
                        v-show="query_results.length"
                        v-for="(result, idx) of query_results"
                        :key="result.id"
                        :data-idx="idx"
                        class="p2 m-auto flex w-full max-w-7xl cursor-pointer items-center justify-center sm:p-4 lg:p-6"
                        @click="show(result.id)"
                    >
                        <CourseMetaCard v-bind="result as any" />
                    </div>
                </transition-group>
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

                <div v-if="query_results.length" class="m-auto flex max-w-7xl p-2 text-xl text-gray-500 sm:px-6 lg:px-10">
                    <div class="m-auto flex max-w-7xl items-center justify-center p-2 sm:p-4 lg:p-6">
                        <div
                            v-show="offset > 0"
                            class="cursor-pointer rounded p-4 text-center transition-all hover:text-gray-800 sm:p-5 lg:p-6"
                            @click="prev_page"
                        >
                            <i-octicon-chevron-left class="mr-1 inline" />
                        </div>
                    </div>
                    <div class="flex items-center justify-center p-4 text-center sm:p-5 lg:p-6">
                        <span>第 {{ offset + 1 }} - {{ offset + query_results.length }} 筆</span>
                    </div>
                    <div
                        v-show="query_results.length === limit"
                        class="m-auto flex max-w-7xl items-center justify-center p-2 sm:p-4 lg:p-6"
                    >
                        <div
                            class="cursor-pointer rounded p-4 text-center transition-all hover:text-gray-800 sm:p-5 lg:p-6"
                            @click="next_page"
                        >
                            <i-octicon-chevron-right class="ml-1 inline" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <transition name="detail">
            <div
                v-if="detail_course && detail_course.name"
                class="fixed top-0 left-0 z-20 h-screen w-screen bg-black/60 pt-2 sm:px-2 lg:p-4"
            >
                <FullScreenCard v-bind="(detail_course as any)" class="h-full w-full rounded-t-lg sm:rounded-t-xl" />
                <i-octicon-x
                    class="absolute top-4 right-2 cursor-pointer sm:right-4 lg:top-7 lg:right-7 lg:text-lg"
                    @click="detail_course = null"
                />
            </div>
        </transition> -->
    </div>
</template>
