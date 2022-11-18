<script lang="ts" setup>
useHead({ title: "部落格 | UniCourse" });

const router = useRouter();



</script>


<template>
    <h1 class="p-5">
        {{ $route.path }}
    </h1>
</template>
