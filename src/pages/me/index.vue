<script lang="ts" setup>
import Swal from "sweetalert2";
import { EndpointResponseBody } from "unicourse";
import { reactive } from "vue";
import uni, { user } from "../../uni";

useHead({ title: "個人 | UniCourse" });

const route = useRoute();
const router = useRouter();

const me = reactive<EndpointResponseBody<"me">>({
    username: "",
    profile: {
        avatar: "https://unicourse-tw.github.io/Public-Assets/icon/UniCourse_icon_fade.256x256.png",
        banner: "",
        bio: "",
        email: "",
        location: "",
        name: "",
        school: "",
        extra: {},
    },
    email: {
        email: "",
        verified: false,
    },
    groups: [],
    invitations: [],
    perms: [],
});

const editing = ref(true);

init();

async function init() {
    if (!uni.is_valid()) {
        Swal.fire({
            icon: "error",
            title: "未登入",
            text: "請先登入",
        });
        router.push("/auth");
        return;
    }

    try {
        Object.assign(me, await uni.req("me"));
        await verifiyReminder();
    } catch {}
}

async function verifiyReminder() {
    if (!me.email.verified) {
        const result = await Swal.fire({
            icon: "error",
            title: "未驗證",
            text: "請先驗證",
            showCancelButton: true,
            confirmButtonText: "重新寄送",
            cancelButtonText: "了解",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const { email } = (await uni.req("auth/send-verify", { method: "POST" })) as { email: string };
                return email;
            },
            allowOutsideClick: () => !Swal.isLoading(),
        });

        if (result.isConfirmed) {
            Swal.fire({
                icon: "success",
                title: "已重新寄送驗證信",
                text: `請至 ${result.value} 收信`,
            });
        }
    }
}

async function save() {
    try {
        me.profile = await uni.req(`profile/${me.username}`, {
            method: "PATCH",
            body: {
                name: me.profile.name,
                bio: me.profile.bio,
                avatar: me.profile.avatar || undefined,
                banner: me.profile.banner || undefined,
                email: me.profile.email || undefined,
                location: me.profile.location,
                school: me.profile.school,
            },
        });
        Swal.fire({
            icon: "success",
            title: "儲存成功",
            text: "個人資料已儲存",
        });
    } catch {}
}

async function copy(data: string) {
    try {
        await navigator.clipboard.writeText(data);
        Swal.fire({
            icon: "success",
            title: "複製成功",
            text: "已複製到剪貼簿",
        });
    } catch {}
}
</script>

<template>
    <div>
        <div class="empty setMiddle">
            <div class="gradientBlock">
                <div
                    :style="{
                        backgroundImage: `url(${me.profile.banner})`,
                    }"
                ></div>
            </div>
            <div class="circle">
                <img alt="頭像" :src="me.profile.avatar" class="avatar" />
            </div>
        </div>
        <div class="setMiddle setUsername">
            <b>
                <span id="name">{{ me.profile.name }}</span>
            </b>
        </div>
        <div class="flex w-screen items-start justify-center p-4 text-lg lg:p-6">
            <div class="flex w-full flex-col gap-y-4 text-blue-500 md:w-2/5">
                <Input label="帳號名稱" v-model="me.username" disabled />
                <Input :label="`電子郵件 (${me.email.verified ? '已' : '未'}驗證)`" v-model="me.email.email" disabled />
                <Input label="顯示名稱" v-model="me.profile.name" :disabled="!editing" />
                <label class="text-lg text-blue-500">
                    簡介
                    <textarea
                        v-model="me.profile.bio"
                        :disabled="!editing"
                        rows="2"
                        class="m-2 w-full border-b-[3px] border-blue-300 p-2 outline-none transition-all duration-200 focus:border-indigo-500"
                    ></textarea>
                </label>
                <Input label="學校" v-model="me.profile.school" :disabled="!editing" />
                <Input label="城市" v-model="me.profile.location" :disabled="!editing" />
                <Input label="頭像網址" v-model="me.profile.avatar" :disabled="!editing" />
                <Input label="封面網址" v-model="me.profile.banner" :disabled="!editing" />
                <Input label="公開的電子郵件" v-model="me.profile.email" :disabled="!editing" />

                <div class="buttonBlock flex gap-x-6">
                    <button
                        class="break-normal bg-gray-100 px-2 text-blue-400 transition-all duration-200 hover:bg-gray-200 hover:text-lg hover:font-bold hover:text-fuchsia-400 sm:px-4"
                        @click="save"
                    >
                        儲存
                    </button>
                </div>

                <div class="border-1 mb-4 flex flex-col gap-y-2">
                    <div v-for="invitation in me.invitations" :key="invitation.id" class="flex gap-x-2">
                        <div
                            :class="[
                                'flex w-full flex-col gap-y-2 rounded-md border p-4',
                                invitation.used ? 'border-gray-400 text-gray-400' : 'cursor-pointer border-purple-400 text-purple-500',
                            ]"
                            @click="
                                () => {
                                    if (!invitation.used) {
                                        copy(invitation.id);
                                    }
                                }
                            "
                        >
                            <div>
                                邀請碼 <b>{{ invitation.id }}</b>
                            </div>
                            <div v-if="invitation.used && invitation.to">
                                <router-link :to="`/profile/${invitation.to}`">
                                    已被 {{ user(invitation.to).name }} 使用於
                                    {{ new Date(invitation.used).toLocaleString() }}
                                </router-link>
                            </div>
                            <div v-else>
                                <a> 尚未使用 </a>
                            </div>
                        </div>
                    </div>
                </div>
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
