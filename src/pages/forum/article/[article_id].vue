<script lang="ts" setup>
useHead({ title: "文章 | UniCourse" });

const route = useRoute();

const article_id = route.params.article_id;
console.log(article_id);
</script>

<template>
    <h1 class="p-5">
        {{ $route.path }}
    </h1>
</template>
