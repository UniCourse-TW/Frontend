<script lang="ts" setup>
useHead({ title: "文章 | UniCourse" });

const route = useRoute();

const article_id = route.params.article_id;
console.log(article_id);
</script>

<template>
    <div w="full"></div>
</template>
