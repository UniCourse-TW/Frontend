<script lang="ts" setup>
import type { PropType } from "vue";
import type { CourseLocation, CourseTime, CourseInfo } from "../../types";
import { marked } from "marked";

const props = defineProps({
    course: {
        type: Object as PropType<CourseInfo | null>,
        default: () => null,
    },
});

const course = props.course;
const gradings = computed(() => {
    if (!course) return [];

    return course.grading
        .sort((a, b) => b.weight - a.weight)
        .map((grading) => ({
            ...grading,
            color: grading.weight > 50 ? "text-gray-800" : `text-gray-${Math.floor(grading.weight / 10 + 3) * 100}`,
        }));
});

const fold = reactive({
    choose: false,
    grading: false,
    goals: false,
    syllabus: true,
});

function readable_schedule({ day, from, to, campus, classroom }: CourseTime & CourseLocation) {
    if (day < 0) {
        return "密集課程";
    }

    const days = ["", "一", "二", "三", "四", "五", "六", "日"];

    return `週${days[day]} ${from === to ? `${from}` : `${from}-${to}`} ${campus} ${classroom}`;
}
</script>

<template>
    <div class="h-full w-full overflow-hidden rounded-t-2xl bg-white p-4">
        <div class="h-full flex-row overflow-y-auto overflow-x-hidden break-words">
            <div v-if="!course" class="animate-pulse">載入中 ...</div>
            <div v-else class="lg:flex">
                <div class="w-full lg:inline-block lg:w-2/3 lg:pr-1">
                    <h2 title="授課系所與教師" class="my-1 text-sm text-gray-600">
                        {{ course.department }} {{ course.teachers.join("、") }}
                    </h2>

                    <h1 class="my-1 text-xl font-bold">
                        <span>{{ course.name }}</span>
                        <span class="text-base">
                            <span title="開課學年度" class="text-gray-600">{{ course.year }}</span>
                            <span class="text-gray-400">-</span>
                            <span title="開課學期" class="text-gray-600">{{ course.term }}</span>
                            <span class="text-gray-400"> | </span>
                            <span title="該期開課序號" class="text-gray-600">{{ course.serial }}</span>
                            <span class="text-gray-400"> | </span>
                            <span title="科目代碼" class="text-gray-600">{{ course.code }}</span>
                        </span>
                    </h1>

                    <hr />

                    <h2 title="學分與授課時段" class="my-1 text-sm text-gray-500">
                        {{ course.credit }} 學分，實際授課
                        <span :class="['font-bold', course.hours > course.credit ? 'text-yellow-500' : 'text-green-500']">{{
                            course.hours
                        }}</span>
                        小時 ({{ course.schedule.map(readable_schedule).join("、") }})
                    </h2>

                    <h2 title="相關學程" class="my-1 text-xs text-gray-400 sm:text-sm">{{ course.programs.join(" | ") }}</h2>

                    <div class="mt-3 mb-6">
                        <span>{{ course.description }}</span>
                    </div>

                    <div class="my-3">
                        <h2 class="cursor-pointer text-lg font-bold" @click="fold.choose = !fold.choose">
                            <IconFold :fold="fold.choose" class="absolute translate-y-[5%] text-gray-500" />
                            <span class="ml-7 lg:ml-8">選課資訊</span>
                        </h2>
                        <hr class="mt-1 mb-2" />
                        <AniFade direction="up">
                            <div v-show="!fold.choose" class="overflow-hidden p-2 text-gray-700">
                                <p>
                                    名額： <span class="font-bold text-indigo-600">{{ course.quota.limit }}</span> 人 + 授權碼
                                    <span class="font-bold text-indigo-600">x{{ course.quota.additional }}</span>
                                </p>
                                <p v-if="course.restrict" class="text-red-600">限制： {{ course.restrict }}</p>
                                <p v-if="course.comment">備註： {{ course.comment }}</p>
                                <p v-if="!course.restrict && !course.comment">沒有其餘限制</p>
                            </div>
                        </AniFade>
                    </div>

                    <div class="my-3">
                        <h2 class="cursor-pointer text-lg font-bold" @click="fold.grading = !fold.grading">
                            <IconFold :fold="fold.grading" class="absolute translate-y-[5%] text-gray-500" />
                            <span class="ml-7 lg:ml-8">評分方式</span>
                        </h2>
                        <hr class="mt-1 mb-2" />
                        <AniFade direction="up">
                            <div v-show="!fold.grading" class="group overflow-hidden p-2">
                                <div v-for="(grading, idx) of gradings" :key="idx" class="my-1">
                                    <span :class="[grading.color, 'transition-all group-hover:text-gray-700']">
                                        {{ grading.weight }}% <span class="font-bold">{{ grading.type }}</span> -
                                        {{ grading.note }}
                                    </span>
                                </div>
                            </div>
                        </AniFade>
                    </div>

                    <div class="my-3">
                        <h2 class="cursor-pointer text-lg font-bold" @click="fold.goals = !fold.goals">
                            <IconFold :fold="fold.goals" class="absolute text-gray-500" />
                            <span class="ml-7 lg:ml-8">教學目標及方法</span>
                        </h2>
                        <hr class="mt-1 mb-2" />
                        <AniFade direction="up">
                            <div v-show="!fold.goals" class="overflow-hidden p-2">
                                <div v-for="(goal, idx) of course.goals" :key="idx" class="my-1">
                                    <span class="text-gray-700">{{ idx + 1 }}. {{ goal }}</span>
                                </div>
                                <h3 class="mt-2 font-bold">教學方法</h3>
                                <div v-for="(method, idx) of course.methodologies" :key="idx" class="my-1">
                                    <span class="text-gray-700">
                                        <span class="font-bold">{{ method.type }}</span> - {{ method.note }}
                                    </span>
                                </div>
                            </div>
                        </AniFade>
                    </div>

                    <div class="my-3">
                        <h2 class="cursor-pointer text-lg font-bold" @click="fold.syllabus = !fold.syllabus">
                            <IconFold :fold="fold.syllabus" class="absolute text-gray-500" />
                            <span class="ml-7 lg:ml-8">教學大綱</span>
                        </h2>
                        <hr class="mt-1 mb-2" />
                        <AniFade direction="up">
                            <div v-show="!fold.syllabus" class="overflow-hidden p-2" v-html="marked.parse(course.syllabus)"></div>
                        </AniFade>
                    </div>
                </div>
                <div class="hidden h-full lg:inline-block lg:w-1/3 lg:pt-6 lg:pl-1">
                    <h1 class="border-l-2 border-indigo-500 pl-1 text-2xl">課程評價</h1>
                    <p class="m-2">共 {{ course.rating.count }} 個評分</p>
                    <div class="m-2 grid grid-cols-[4rem_auto]">
                        <span>甜度</span>
                        <div>
                            <IconStars :value="course.rating.sweetness" />
                            ( {{ course.rating.sweetness }} 分 )
                        </div>
                        <span>涼度</span>
                        <div>
                            <IconStars :value="course.rating.easiness" />
                            ( {{ course.rating.easiness }} 分 )
                        </div>
                        <span>實用度</span>
                        <div>
                            <IconStars :value="course.rating.usefulness" />
                            ( {{ course.rating.usefulness }} 分 )
                        </div>
                    </div>
                    <hr />
                    <div v-for="(review, idx) of course.reviews" :key="idx" class="m-2 rounded-md border p-2">
                        <div class="flex items-center gap-x-2">
                            <img src="https://picsum.photos/24" class="h-6 w-6 rounded-full bg-gray-200" />
                            <span class="text-gray-700">{{ review.user }}</span>
                        </div>
                        <div class="pl-8 text-xs text-gray-500">{{ new Date(review.time).toLocaleString() }}</div>
                        <div class="my-2 pl-8 pr-2">{{ review.content }}</div>
                        <div class="flex items-center justify-between pr-2 text-xs">
                            <div class="flex flex-col items-center">
                                <span class="mx-2 inline-block w-full text-sm text-gray-500">甜度</span>
                                <span><IconStars :value="review.rating.sweetness" /></span>
                            </div>
                            <div class="flex flex-col items-center">
                                <span class="mx-2 inline-block w-full text-sm text-gray-500">涼度</span>
                                <span><IconStars :value="review.rating.easiness" /></span>
                            </div>
                            <div class="flex flex-col items-center">
                                <span class="mx-2 inline-block w-full text-sm text-gray-500">實用度</span>
                                <span><IconStars :value="review.rating.usefulness" /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
