<script lang="ts" setup>
import type { CourseInfo } from "../../types";
import { courses } from "../../api";
const route = useRoute();

const key = route.params.key as string;

const course = ref<CourseInfo | null>(null);
const not_found = ref(false);

query();

async function query() {
    try {
        const data = await courses.info(key);
        course.value = data;
    } catch (e) {
        console.error(e);
        not_found.value = true;
    }
}
</script>

<template>
    <FullScreenCard :course="course" class="h-screen w-screen" v-if="!not_found" />
    <div class="flex h-screen w-screen items-start justify-center text-lg sm:text-xl lg:text-2xl" v-else>
        <div class="p-8 text-center">
            拍謝，我們找不到這門課！ＱＱ
            <Link to="/course" class="hover:text-rainbow m-2 block text-indigo-600 transition-all hover:font-bold"> 前往課程查詢 </Link>
        </div>
    </div>
</template>
