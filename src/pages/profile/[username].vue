<script lang="ts" setup>
const route = useRoute();

const username = route.params.username;

// show information
const c_username = ref("");
const c_description = ref("");

// console.log(username);

useHead({ title: username + " | UniCourse" });
</script>

<template>
    <div class="empty setMiddle">
        <div class="gradientBlock"></div>
        <div class="circle">
            <img alt="頭像" src="https://unicourse-tw.github.io/Public-Assets/icon/UniCourse_icon_fade.256x256.png" class="avatar" />
            <!-- <div class="aui-info">
                <img src="../../assets/profile/default.svg" id="img-txz" style="width: 3rem"
                    class="aui-img-round user-img" />
                <input type="file" accept="image/*" id="file-txz" name="file"
                    onchange="upload('#file-txz', '#img-txz');" class="fileInput" value="" />
            </div> -->
        </div>
    </div>
    <div class="setMiddle setUsername">
        <b>
            <span id="name">{{ username }}</span>
        </b>
    </div>
    <div class="flex w-screen items-start justify-center p-4 text-lg lg:p-6">
        <div class="flex w-2/5 flex-col gap-y-4 text-blue-500">
            <Input label="username" :placeholder="c_username" />
            <label class="text-lg text-blue-500">
                description
                <textarea
                    :placeholder="c_description"
                    rows="2"
                    class="m-2 w-full border-b-[3px] border-blue-300 p-2 outline-none transition-all duration-200 focus:border-indigo-500"
                ></textarea>
            </label>
        </div>
    </div>
</template>
