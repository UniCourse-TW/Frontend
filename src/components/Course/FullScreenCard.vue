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
    <div bg="black opacity-50" w="screen" h="screen" z="100" p="sm:x-8 lg:x-12 t-4 sm:t-6 lg:t-8" class="fixed top-0 left-0" @click="hide">
        <div data-locator="card" bg="white" w="full" h="full" p="4" class="card-body rounded-t-2xl overflow-hidden">
            <div h="full" class="overflow-y-auto overflow-x-hidden break-words">
                <div v-if="!course_info">Fetching ...</div>
                <div v-if="course_info">
                    <span> {{ course_info.name }} </span> <br />
                    <span> 教授：{{ course_info.teachers.join(" and ") }} </span> <br />
                    <span> 學分：{{ course_info.credit }} </span> <br />
                    Course Informations (including some reviews related to this course)... <br />

                    <div v-for="review in course_info.reviews">
                        <div my="4">
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
            <span p="2" class="absolute top-3 right-3 cursor-pointer" @click="hide">X</span>
        </div>
    </div>
</template>
