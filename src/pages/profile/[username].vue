<script lang="ts" setup>
import { user } from "../../uni";
const route = useRoute();

const username = route.params.username;
const profile = user(username);

useHead({ title: username + " | UniCourse" });
watch(profile, () => {
    useHead({ title: profile.name + " | UniCourse" });
});
</script>

<template>
    <div>
        <div class="empty setMiddle">
            <div class="gradientBlock">
                <div
                    :style="{
                        backgroundImage: `url(${profile.banner})`,
                    }"
                ></div>
            </div>
            <div class="circle">
                <img alt="頭像" :src="profile.avatar" class="avatar" />
            </div>
        </div>
        <div class="setMiddle setUsername">
            <b>
                <span id="name">{{ profile.name }}</span>
            </b>
        </div>
        <div class="setMiddle">
            <div class="whitespace-pre-wrap">{{ profile.bio }}</div>
        </div>
        <div class="flex w-screen items-start justify-center p-4 text-lg lg:p-6">
            <div class="flex w-full flex-col gap-y-4 text-blue-500 md:w-2/5">
                <Input label="電子郵件" :value="profile.email" disabled />
                <Input label="學校" :value="profile.school" disabled />
                <Input label="城市" :value="profile.location" disabled />
            </div>
        </div>
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
    box-shadow: 0 0 50px lightgray;
    height: 350px;
}

.gradientBlock > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to top, #ffecf5, #ccccff, #acd6ff);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.7;
}

.circle {
    width: 262px;
    height: 262px;
    border-radius: 999em;
    border: 6px solid white;
    background-color: white;
    position: absolute;
    bottom: 0px;
}

.avatar {
    width: 250px;
    height: 250px;
    border-radius: 999em;
    top: 0px;
}

.setUsername {
    font-size: 40px;
}

.buttonBlock {
    margin-left: 47%;
    margin-bottom: 40px;
}
</style>
