<script lang="ts" setup>
import { PropType } from "vue";
import type { CourseLocation, CourseTime, CourseTag } from "../../types";

const props = defineProps({
    name: { default: "" },
    credit: { default: 0 },
    year: { default: 0 },
    term: { default: 0 },
    department: { default: "" },
    code: { default: "" },
    group: { default: "" },
    serial: { default: 0 },
    restrict: { default: "" },
    featured: { default: false },
    programs: { type: Array as PropType<string[]>, default: () => [] },
    schedule: { type: Array as PropType<(CourseTime & CourseLocation)[]>, default: () => [] },
    teachers: { type: Array as PropType<string[]>, default: () => [] },
    tags: { type: Array as PropType<CourseTag[]>, default: () => [] },
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
    <div
        v-if="props.name"
        :class="
            'h-40 w-full overflow-hidden overflow-y-auto rounded border bg-white p-3 shadow shadow-blue-200 transition-all hover:shadow-md hover:shadow-indigo-200 sm:px-5 lg:px-6' +
            (props.featured ? ' border-purple-300 bg-gradient-to-r from-indigo-50 via-fuchsia-50 to-fuchsia-50' : '')
        "
    >
        <div>
            <h2 title="授課系所與教師" class="my-1 text-sm text-gray-600">{{ props.department }} {{ props.teachers.join("、") }}</h2>

            <h1 class="my-1 text-xl font-bold">
                <span :class="props.featured ? 'text-rainbow' : ''">{{ props.name }}</span>
                <span class="text-base">
                    <span title="開課學年度" class="text-gray-600">{{ props.year }}</span>
                    <span class="text-gray-400">-</span>
                    <span title="開課學期" class="text-gray-600">{{ props.term }}</span>
                    <span class="text-gray-400"> | </span>
                    <span title="該期開課序號" class="text-gray-600">{{ props.serial }}</span>
                    <span class="text-gray-400"> | </span>
                    <span title="科目代碼" class="text-gray-600">{{ props.code }}</span>
                </span>
            </h1>

            <h2 title="學分與授課時段" class="my-1 text-sm text-gray-500">
                {{ props.credit }} 學分 ({{ props.schedule.map(readable_schedule).join("、") }})
            </h2>

            <h2 title="相關學程" class="my-1 text-xs text-gray-400 sm:text-sm">{{ props.programs.join(" | ") }}</h2>
        </div>
        <div title="標籤" class="absolute bottom-0 left-0 w-full py-2 px-3 sm:px-5 lg:px-6">
            <div class="flex">
                <div
                    v-for="tag in props.tags"
                    class="mr-1 inline-block rounded px-1 py-0.5 text-xs sm:text-sm"
                    :style="{ background: tag.color || '#e9e9e9' }"
                >
                    <span>{{ tag.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
