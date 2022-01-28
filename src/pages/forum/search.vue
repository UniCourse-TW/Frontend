<script lang="ts" setup>
useHead({ title: "論壇搜尋 | UniCourse" });

const query_body = ref(<string>(useRoute().query.q || ""));

if (query_body.value) {
    query();
}

function query() {
    console.log(query_body.value);
}
</script>

<template>
    <div>
        <SearchBar v-model="query_body" :action="query" placeholder="搜尋文章及提問" />
    </div>
</template>
