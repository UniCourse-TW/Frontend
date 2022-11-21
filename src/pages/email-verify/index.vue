<script lang="ts" setup>
import { unionTypeAnnotation } from "@babel/types";
import Swal from "sweetalert2";

useHead({ title: "驗證 | UniCourse" });

const route = useRoute();
const router = useRouter();
const processing = ref(false);

async function verified() {
    if (processing.value) {
        return;
    }
    processing.value = true;
    Swal.fire({
        icon: "success",
        title: "驗證成功",
        text: `註冊信箱驗證成功！`,
    });
}
verified();

router.push("/");
</script>

<template>
    <div></div>
</template>

<style scoped></style>
