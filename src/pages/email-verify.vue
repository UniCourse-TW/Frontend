<script lang="ts" setup>
import uni from "../uni";
import Swal from "sweetalert2";

useHead({ title: "驗證 | UniCourse" });

const route = useRoute();
const router = useRouter();
const id = route.query.id as string;
if (!id) {
    Swal.fire({
        icon: "error",
        title: "錯誤",
        text: "無效的驗證碼",
    });
    router.push("/");
}

verify();

async function verify() {
    try {
        await uni.req("auth/verify", {
            method: "GET",
            body: { id },
        });
        Swal.fire({
            icon: "success",
            title: "驗證成功",
            text: `信箱驗證成功！`,
        });
    } catch {}

    router.push("/me");
}
</script>

<template>
    <div></div>
</template>

<style scoped></style>
