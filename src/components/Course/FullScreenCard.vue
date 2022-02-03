<script lang="ts" setup>
import type { CourseInfo } from "../../types";
import { get_course_info } from "../../api";

const course_info = ref<CourseInfo | null>(null);

const props = defineProps({
    course_key: { default: "" },
    close: { default: () => undefined },
});

fetch_course_info();

async function fetch_course_info() {
    const info = await get_course_info(props.course_key);
    course_info.value = info;
}

function hide(evt: MouseEvent) {
    if (evt.target === evt.currentTarget) {
        props.close?.();
    }
    return undefined;
}
</script>

<template>
    <div class="fixed top-0 left-0 z-20 h-screen w-screen bg-black bg-opacity-50 pt-4 sm:px-8 sm:pt-6 lg:px-12 lg:pt-8" @click="hide">
        <div data-locator="card" class="card-body h-full w-full overflow-hidden rounded-t-2xl bg-white p-4">
            <div class="h-full overflow-y-auto overflow-x-hidden break-words">
                <div v-if="!course_info">Fetching ...</div>
                <div v-if="course_info">
                    <span> {{ course_info.name }} </span> <br />
                    <span> 教授：{{ course_info.teachers.join(" and ") }} </span> <br />
                    <span> 學分：{{ course_info.credit }} </span> <br />
                    Course Informations (including some reviews related to this course)... <br />

                    <div v-for="review in course_info.reviews">
                        <div class="my-4">
                            <span> {{ review.user }} </span> <br />
                            <span> {{ review.content }} </span> <br />
                            <span> {{ new Date(review.time).toLocaleString() }} </span> <br />
                            <span> 甜度： {{ review.rating.gpa }} </span> <br />
                            <span> 涼度： {{ review.rating.easy }} </span> <br />
                            <span> 實用度： {{ review.rating.usefulness }} </span> <br />
                        </div>
                    </div>
                </div>
            </div>
            <span class="absolute top-3 right-3 cursor-pointer p-2" @click="hide">X</span>
        </div>
    </div>
</template>
