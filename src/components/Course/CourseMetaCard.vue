<script lang="ts" setup>
import { Course, CourseProgram, CourseType, Entity, Teacher } from "@unicourse-tw/prisma";
import type { CourseLocation, CourseTag, CourseTime } from "../../types";

const props: (Course & {
    provider: Entity;
    programs: CourseProgram[];
    teachers: Teacher[];
}) & { [key: string]: unknown } = defineProps({
    id: { default: "" },
    name: { default: "" },
    description: { default: "" },
    type: { default: "" as CourseType },
    credit: { default: 0 },
    code: { default: "" },
    year: { default: 0 },
    term: { default: 0 },
    provider_id: { default: "" },
    provider: { default: () => ({} as Entity) },
    programs: { default: () => [] as CourseProgram[] },
    teachers: { default: () => [] as Teacher[] },
    featured: { default: false },
    extra: { default: () => ({}) },
});
</script>

<template>
    <div
        v-if="props.name"
        :class="[
            'h-40 w-full overflow-hidden overflow-y-auto rounded border bg-white p-3 shadow shadow-blue-200 transition-all hover:shadow-md hover:shadow-indigo-200 sm:px-5 lg:px-6',
            props.featured ? 'border-purple-300 bg-gradient-to-r from-indigo-50 via-fuchsia-50 to-fuchsia-50' : '',
        ]"
    >
        <div>
            <h2 title="授課系所與教師" class="my-1 text-sm text-gray-600">
                {{ props.department }} {{ props.teachers.map((t) => t.name).join("、") }}
            </h2>

            <h1 class="my-1 text-xl font-bold">
                <span :class="props.featured ? 'text-rainbow' : ''">{{ props.name }}</span>
                <span class="text-base">
                    <span title="開課年度" class="text-gray-600">{{ props.year }}</span>
                    <span class="text-gray-400">-</span>
                    <span title="開課學期" class="text-gray-600">{{ props.term }}</span>
                    <span class="text-gray-400"> | </span>
                    <span title="科目代碼" class="text-gray-600">{{ props.code }}</span>
                </span>
            </h1>

            <h2 title="學分" class="my-1 text-sm text-gray-500">{{ props.credit }} 學分</h2>

            <h2 title="相關學程" class="my-1 text-xs text-gray-400 sm:text-sm">{{ props.programs.map((p) => p.name).join(" | ") }}</h2>
        </div>
        <!-- <div title="標籤" class="absolute bottom-0 left-0 w-full py-2 px-3 sm:px-5 lg:px-6">
            <div class="flex">
                <Tag v-for="tag in props.tags" :key="tag.name" :content="tag.name" class="mr-1" />
            </div>
        </div> -->
    </div>
</template>
