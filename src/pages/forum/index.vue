<script lang="ts" setup>
useHead({ title: "論壇 | UniCourse" });

const router = useRouter();

const query_body = ref("");

function query() {
    router.push({
        path: "/forum/search",
        query: { q: query_body.value },
    });
}
</script>

<template>
    <div w="full">
        <SearchBar v-model="query_body" :action="query" placeholder="搜尋文章及提問" />
        <div w="full" max-w="1200px" m="auto" p="4">
            <div w="full lg:2/3" min-h="30rem" p="x-4" class="inline-block">
                <h2 text="lg lg:xl">最新文章</h2>
            </div>
            <div w="full lg:1/3" min-h="30rem" p="x-4" border="lg:l-blue-200 lg:l-2" class="inline-block">
                <h2 text="lg lg:xl">即時提問</h2>
            </div>
        </div>
    </div>
</template>
