<script lang="ts" setup>
import uni from "../../uni";
import Swal from "sweetalert2";

useHead({ title: "驗證 | UniCourse" });

const route = useRoute();
const router = useRouter();

async function verified() {
    const id = route.query.id as string;
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
    } catch (err) {
        if (err instanceof Error) {
            Swal.fire({
                icon: "error",
                title: "驗證失敗",
                text: err.message,
            });
        }
    }
    verified();
}
router.push("/");
</script>

<template>
    <div></div>
</template>

<style scoped></style>
