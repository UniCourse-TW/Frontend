<script lang="ts" setup>
const route = useRoute();

const username = route.params.username;

// console.log(username);

useHead({ title: username + " | UniCourse" });
</script>



<template>
    <div class="w-full"></div>
</template>
