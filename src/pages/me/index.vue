<script lang="ts" setup>
useHead({ title: "個人 | UniCourse" });

const router = useRouter();
// const username = ref("test");
// router.push({ path: "me/username=", username });
// 1. how to write url?

</script>

<template>
    <div class="empty setMiddle">
        <div class="gradientBlock"></div>
        <img alt="頭像" src="../../assets/icon.svg" class="avatar" />
    </div>
    <div class="setMiddle setUsername">username</div>
    <div class="infoBlock">
        <div>account</div>
        <div>username</div>
        <div>password</div>
        <div>email</div>
        <div>std_id</div>
        <div>verified</div>
        <div>badges</div>
        <!--2. what this??? "display": "string", -->
    </div>
</template>


<style scoped>
.setMiddle {
    position: relative;
    display: flex;
    /* 水平置中 */
    justify-content: center;
}

.empty {
    height: 450px;
}

.gradientBlock {
    width: 100%;
    background-image: linear-gradient(to top, #CCCCFF, #B399FF, #6495ED);
    box-shadow: 0 0 50px #0000CD;
    height: 350px;
}

.avatar {
    width: 250px;
    height: 250px;
    border-radius: 999em;
    border: 3px solid white;
    position: absolute;
    bottom: 0;
}

.setUsername {
    font-size: 40px;
}

.infoBlock {
    width: 100%;
    height: 100%;
    margin: 40px;
    border: #87CEFA;
}
</style>
