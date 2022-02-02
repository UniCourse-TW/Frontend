<script lang="ts" setup>
useHead({ title: "論壇 | UniCourse" });

const router = useRouter();

const query_body = ref("");

function query() {
    router.push({ path: "/forum/search", query: { q: query_body.value } });
}
</script>

<template>
    <div class="w-full">
        <SearchBar v-model="query_body" :search="query" placeholder="搜尋文章及提問" />
        <div class="m-auto w-full max-w-[1200px] p-4">
            <div class="inline-block min-h-[30rem] w-full px-4 lg:w-2/3">
                <h2 class="text-lg lg:text-xl">最新文章</h2>
            </div>
            <div class="inline-block min-h-[30rem] w-full px-4 lg:w-1/3 lg:border-l-2 lg:border-l-blue-200">
                <h2 class="text-lg lg:text-xl">即時提問</h2>
            </div>
        </div>
    </div>
</template>
