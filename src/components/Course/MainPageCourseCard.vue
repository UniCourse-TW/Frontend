<script lang="ts" setup>
import { marked } from "marked";
import { EndpointResponseBody } from "unicourse";

const props = defineProps<{
    course: EndpointResponseBody<`courses/${string}`>;
}>();

const course = props.course;
const extra = computed(() => {
    if (!course) {
        return {
            goals: "",
            grade: 1,
            group: "",
            hours: NaN,
            quota: { limit: NaN, additional: NaN },
            serial: 0,
            comment: "",
            restrict: "",
            scheduel: "",
            syllabus: "",
            methodologies: { note: "", type: "" },
        };
    }

    const ex = course.extra && typeof course.extra === "object" && !Array.isArray(course.extra) ? course.extra : {};

    return {
        goals: typeof ex.goals === "string" ? ex.goals : "",
        grade: typeof ex.grade === "number" ? ex.grade : NaN,
        group: typeof ex.group === "string" ? ex.group : "",
        hours: typeof ex.hours === "number" ? ex.hours : NaN,
        quota: {
            limit:
                typeof ex.quota === "object" && !Array.isArray(ex.quota)
                    ? typeof ex.quota?.limit === "number"
                        ? ex.quota.limit
                        : NaN
                    : NaN,
            additional:
                typeof ex.quota === "object" && !Array.isArray(ex.quota)
                    ? typeof ex.quota?.additional === "number"
                        ? ex.quota.additional
                        : NaN
                    : NaN,
        },
        serial: typeof ex.serial === "number" ? ex.serial : NaN,
        comment: typeof ex.comment === "string" ? ex.comment : "",
        restrict: typeof ex.restrict === "string" ? ex.restrict : "",
        scheduel: typeof ex.scheduel === "string" ? ex.scheduel : "",
        syllabus: typeof ex.syllabus === "string" ? ex.syllabus : "",
        methodologies: {
            note:
                typeof ex.methodologies === "object" && !Array.isArray(ex.methodologies)
                    ? typeof ex.methodologies?.note === "string"
                        ? ex.methodologies.note
                        : ""
                    : "",
            type:
                typeof ex.methodologies === "object" && !Array.isArray(ex.methodologies)
                    ? typeof ex.methodologies?.type === "number"
                        ? ex.methodologies.type
                        : ""
                    : "",
        },
    };
});

const fold = reactive({
    choose: false,
    grading: false,
    goals: false,
    syllabus: true,
});
</script>

<template>
    <div
        v-if="course.name"
        :class="[
            'h-1/2 w-full overflow-scroll overflow-y-scroll rounded border bg-white p-3 shadow shadow-blue-200 transition-all hover:shadow-md hover:shadow-indigo-200 sm:px-5 lg:px-6',
            course.name ? 'border-purple-300 bg-gradient-to-r from-indigo-50 via-fuchsia-50 to-fuchsia-50' : '',
        ]"
    >
        <div>
            <h2 title="授課系所與教師" class="my-1 text-center text-sm text-gray-600">
                {{ course.provider.name }} {{ course.teachers.map(({ name }) => name).join("、") }}
            </h2>
            <h1 class="my-1 text-center text-xl font-bold">
                <span :class="course.name ? 'text-rainbow' : ''">{{ course.name }}</span>
                <br />
                <span class="ml-1 text-base">
                    <span class="text-gray-400"> | </span>
                    <span title="科目代碼" class="text-gray-600">{{ course.code }}</span>
                    <span class="text-gray-400"> | </span>
                </span>
            </h1>

            <h2 title="學分與授課時段" class="my-1 text-center text-sm text-gray-500">
                {{ course.credit }} 學分
                <!-- ({{ props.schedule.map(readable_schedule).join("、") }}) -->
            </h2>

            <h2 title="相關學程" class="my-1 text-center text-xs text-gray-400 sm:text-sm">
                {{ course.programs.map(({ name }) => name).join(" | ") }}
            </h2>
        </div>
        <div v-if="course.description" class="my-3">
            <h2 class="cursor-pointer text-lg font-bold" @click="fold.choose = !fold.choose">
                <IconFold :fold="fold.choose" class="absolute translate-y-[5%] text-gray-500" />
                <span class="ml-7 p-10 text-black lg:ml-1">課程簡介</span>
            </h2>
            <AniFade direction="up">
                <div v-show="!fold.choose" class="mt-3 mb-6 overflow-y-scroll p-2 text-center text-base text-gray-700">
                    <span>{{ course.description }}</span>
                </div>
            </AniFade>
        </div>
        <div v-else>
            <h2 class="cursor-pointer text-lg font-bold" @click="fold.choose = !fold.choose">
                <IconFold :fold="fold.choose" class="absolute translate-y-[5%] text-gray-500" />
                <span class="ml-7 p-10 text-black lg:ml-1">課程簡介</span>
            </h2>
            <AniFade direction="up">
                <div v-show="!fold.choose" class="mt-3 mb-6 overflow-y-scroll p-2 text-center text-base text-gray-700">
                    <span>無簡介</span>
                </div>
            </AniFade>
        </div>
        <!-- <div title="標籤" class="absolute bottom-0 left-0 w-full py-2 px-3 sm:px-5 lg:px-6">
            <div class="flex">
                <Tag v-for="tag in props.tags" :key="tag.name" :content="tag.name" class="mr-1" />
            </div>
        </div> -->
    </div>
</template>
