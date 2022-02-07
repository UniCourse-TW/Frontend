<script lang="ts" setup>
import type { PropType } from "vue";
import type { CourseLocation, CourseTime, CourseReview } from "../../types";

const props = defineProps({
    name: { default: "" },
    credit: { default: 0 },
    hours: { default: 0 },
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
    tags: { type: Array as PropType<string[]>, default: () => [] },
    reviews: { type: Array as PropType<CourseReview[]>, default: () => [] },
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
    <div class="card-body h-full w-full overflow-hidden rounded-t-2xl bg-white p-4">
        <div class="h-full overflow-y-auto overflow-x-hidden break-words">
            <div v-if="!props.name">載入中 ...</div>
            <div v-else>
                <div>
                    <h2 title="授課系所與教師" class="my-1 text-sm text-gray-600">
                        {{ props.department }} {{ props.teachers.join("、") }}
                    </h2>

                    <h1 class="my-1 text-xl font-bold">
                        <span>{{ props.name }}</span>
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

                    <hr />

                    <h2 title="學分與授課時段" class="my-1 text-sm text-gray-500">
                        {{ props.credit }} 學分，實際授課
                        <span :class="['font-bold', props.hours > props.credit ? 'text-red-500' : 'text-green-500']">{{
                            props.hours
                        }}</span>
                        小時 ({{ props.schedule.map(readable_schedule).join("、") }})
                    </h2>

                    <h2 title="相關學程" class="my-1 text-xs text-gray-400 sm:text-sm">{{ props.programs.join(" | ") }}</h2>

                    <div class="my-2">
                        <h2>學習目標</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
