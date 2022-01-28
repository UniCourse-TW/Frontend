<script lang="ts" setup>
import type { CourseMeta } from "../../types";

defineProps({ meta: { default: <CourseMeta | null>null } });

const show_full = ref(false);

function show() {
    show_full.value = true;
}

function hide() {
    show_full.value = false;
    return undefined;
}
</script>

<template>
    <div v-if="meta" bg="white" border="~ gray-400" w="full" h="40" p="4 sm:5 lg:6" class="rounded cursor-pointer" @click="show">
        <div>
            <span text="lg"> {{ meta.name }} </span> <br />
            <span> 教授：{{ meta.teachers.join(" and ") }} </span> <br />
            More Course Meta...
        </div>
    </div>

    <transition name="full-card">
        <FullScreenCard v-if="show_full" :course_key="`${meta.year}-${meta.term}-${meta.serial}`" :close="hide" />
    </transition>
</template>

<style scoped>
.full-card-enter-active {
    transition: all 0.3s ease;
}
.full-card-leave-active {
    transition: all 0.3s ease 0.2s;
}

.full-card-enter-from,
.full-card-leave-to {
    opacity: 0;
}

.full-card-enter-active >>> [data-locator="card"],
.full-card-leave-active >>> [data-locator="card"] {
    transition: all 0.25s ease-in-out;
}

.full-card-enter-from >>> [data-locator="card"],
.full-card-leave-to >>> [data-locator="card"] {
    transform: translateY(100vh);
}
</style>
