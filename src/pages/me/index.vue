<script lang="ts" setup>
useHead({ title: "帳號 | UniCourse" });

const router = useRouter();
router.push("/auth");
</script>

<template>
    <BigScreen content="Me" />
</template>
