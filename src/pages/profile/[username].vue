<script lang="ts" setup>
const route = useRoute();

const username = route.params.username;

useHead({ title: username + " | UniCourse" });
</script>

<template>
    <div w="full"></div>
</template>
