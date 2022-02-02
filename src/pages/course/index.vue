<script lang="ts" setup>
import type { CourseMeta } from "../../types";
import { get_course_meta } from "../../api";
import SearchBar from "../../components/SearchBar.vue";
useHead({ title: "課程查詢 | UniCourse" });

const query_body = ref("");
const query_results = reactive(<CourseMeta[]>[]);
const locked = ref(false);
const first = ref(true);
const adv = ref(false);

function rand_placeholder(): string {
    const holders = ["紀博文", "資工系", "程式設計", "UI", "本部", "週四"];
    return holders[Math.floor(Math.random() * holders.length)];
}

async function query() {
    if (locked.value) return;
    locked.value = true;
    try {
        const metae = await get_course_meta(query_body.value);
        query_results.splice(0, query_results.length, ...metae);
    } catch (e) {
        console.error(e);
    } finally {
        locked.value = false;
        first.value = false;
    }
}
</script>

<template>
    <div>
        <SearchBar
            v-model="query_body"
            :search="query"
            :advanced="() => (adv = !adv)"
            :placeholder="'搜尋課程 試試「' + rand_placeholder() + '」？'"
        />

        <div v-if="adv" p="x-6 lg:x-10" flex="~" class="justify-center">
            <div w="11/12">進階選項</div>
        </div>

        <div w="full">
            <div
                v-show="query_results.length"
                v-for="meta in query_results"
                w="full"
                max-w="1400px"
                flex="~"
                p="2 sm:4 lg:6"
                m="auto"
                class="justify-center items-center"
            >
                <MetaCard :meta="meta" />
            </div>
            <div
                v-show="query_results.length === 0 && !first"
                w="full"
                max-w="1400px"
                flex="~"
                p="2 sm:4 lg:6"
                m="auto"
                class="justify-center items-center"
            >
                <div bg="white" border="~ gray-400" w="full" h="40" p="4 sm:5 lg:6" class="rounded cursor-pointer">
                    <div>查無結果，請換個關鍵字試試？</div>
                </div>
            </div>
        </div>
    </div>
</template>
