<script lang="ts" setup>
import { unionTypeAnnotation } from "@babel/types";
import type { User } from "../../types";

useHead({ title: "個人 | UniCourse" });

const route = useRoute();
const router = useRouter();
const username = ref();

const editUser = reactive<User>({
    type: route.query.type === "fix" ? "fix" : "edit",
    jwt: "",
    username: "",
    display: "",
    email: "",
    invitation: {
        code1: {
            distributed: true,
            code: "asdfgh",
            used: true,
            user_name: "user1",
        },
        code2: {
            distributed: true,
            code: "zxcvbn",
            used: false,
            user_name: "",
        },
        code3: {
            distributed: false,
            code: "",
            used: false,
            user_name: "",
        },
    },
});

const e_accountname = ref(""); // Can't edit
const e_username = ref("");
const e_password = ref("");
const e_description = ref("");
const e_email = ref(""); // Can't edit
const e_stuid = ref(""); // Can't edit
const e_verified = ref(""); // Can't edit
const e_invitation = ref(""); // Can't edit

const bottonwords = {
    fix: {
        botton: "修改",
    },
    edit: {
        botton: "儲存",
    },
};

const type = ref(route.query.type === "fix" ? "fix" : "edit");

function switch_type() {
    type.value = type.value === "fix" ? "fix" : "edit";
    router.push({ query: { type: type.value } });
}

/*open after test

const uni = new UniCourse();
const user = await uni.profile("");
// var: name, accountName, Username, password, email, stu_id

var name = document.getElementById('name')?.textContent;
name = uni.name;
var accountName = document.getElementById('accountName')?.textContent;
accountName = uni.accountName;
var Username = document.getElementById('Username')?.textContent;
Username = uni.username;
var email = document.getElementById('email')?.textContent;
email = uni.email;
var stu_id = document.getElementById('stu_id')?.textContent;
stu_id = uni.stu_id;
*/

// router.push({ path: "me/username=", username });
// 1. how to write url?
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
            <div v-if="editUser.type == 'fix'">
                <Input label="帳號" :placeholder="e_accountname" disabled />
                <Input label="使用者名稱" :placeholder="e_username" disabled />
                <Input label="密碼" type="password" :placeholder="e_password" disabled />
                <label class="text-lg text-blue-500">
                    簡介
                    <textarea
                        :placeholder="e_description"
                        disabled
                        rows="2"
                        class="m-2 w-full border-b-[3px] border-blue-300 p-2 outline-none transition-all duration-200 focus:border-indigo-500"
                    ></textarea>
                </label>
                <Input label="電子郵件" :placeholder="e_email" disabled />
                <Input label="學號" :placeholder="e_stuid" disabled />
                <Input label="驗證狀態" :placeholder="e_verified" disabled />
            </div>
            <div v-else>
                <Input label="帳號" :placeholder="e_accountname" disabled />
                <Input label="使用者名稱" :placeholder="e_username" />
                <Input label="密碼" type="password" :placeholder="e_password" disabled />
                <label class="text-lg text-blue-500">
                    簡介
                    <textarea
                        :placeholder="e_description"
                        rows="2"
                        class="m-2 w-full border-b-[3px] border-blue-300 p-2 outline-none transition-all duration-200 focus:border-indigo-500"
                    ></textarea>
                </label>
                <Input label="電子郵件" :placeholder="e_email" disabled />
                <Input label="學號" :placeholder="e_stuid" disabled />
                <Input label="驗證狀態" :placeholder="e_verified" disabled />
            </div>
            <div class="h-0 w-full">
                <label class="text-lg text-blue-500"> 邀請碼 <br /> </label>
            </div>
            <div className=" my-2 mb-0 gap-2">
                <div className="ml-2 mb-0 grid grid-cols-3 gap-2">
                    <div>
                        <div v-if="editUser.invitation.code1.used">
                            <input
                                disabled
                                checked
                                type="checkbox"
                                id="disabled-checked-checkbox"
                                class="m-2 ml-0 mt-3 mr-0 mb-0 h-4 w-1/4 opacity-100"
                            />
                            <label class="w-full text-center text-gray-300">{{ editUser.invitation.code1.user_name }}</label>
                        </div>
                        <div v-else-if="!editUser.invitation.code1.used">
                            <input
                                disabled
                                id="disabled-checkbox"
                                type="checkbox"
                                value=""
                                class="m-2 ml-0 mt-3 mr-0 mb-0 h-4 w-1/4 opacity-100"
                            />
                            <label class="w-full text-center text-gray-300">未使用</label>
                        </div>
                    </div>
                    <div>
                        <div v-if="editUser.invitation.code2.used">
                            <input
                                disabled
                                checked
                                type="checkbox"
                                id="disabled-checked-checkbox"
                                class="m-2 ml-0 mt-3 mr-0 mb-0 h-4 w-1/4 opacity-100"
                            />
                            <label class="w-full text-center text-gray-300">{{ editUser.invitation.code2.user_name }}</label>
                        </div>
                        <div v-else-if="!editUser.invitation.code2.used">
                            <input
                                disabled
                                id="disabled-checkbox"
                                type="checkbox"
                                value=""
                                class="m-2 ml-0 mt-3 mr-0 mb-0 h-4 w-1/4 opacity-100"
                            />
                            <label class="w-full text-center text-gray-300">未使用</label>
                        </div>
                    </div>
                    <div>
                        <div v-if="editUser.invitation.code3.used">
                            <input
                                disabled
                                checked
                                type="checkbox"
                                id="disabled-checked-checkbox"
                                class="m-2 ml-0 mt-3 mr-0 mb-0 h-4 w-1/4 opacity-100"
                            />
                            <label class="w-full text-center text-gray-300">{{ editUser.invitation.code3.user_name }}</label>
                        </div>
                        <div v-else-if="!editUser.invitation.code3.used">
                            <input
                                disabled
                                id="disabled-checkbox"
                                type="checkbox"
                                value=""
                                class="m-2 ml-0 mt-3 mr-0 mb-0 h-4 w-1/4 opacity-100"
                            />
                            <label class="w-full text-center text-gray-300">未使用</label>
                        </div>
                    </div>
                </div>
                <div className="mb-2 grid grid-cols-3 gap-2">
                    <div
                        v-if="editUser.invitation.code1.distributed"
                        class="m-2 h-10 w-full border-b-[3px] border-blue-300 bg-gray-50 p-2 text-center text-gray-400 outline-none transition-all duration-200 focus:border-indigo-500"
                    >
                        {{ editUser.invitation.code1.code }}
                    </div>
                    <div
                        v-else-if="!editUser.invitation.code1.distributed"
                        class="m-2 h-10 w-full border-b-[3px] border-blue-300 bg-gray-50 p-2 text-center text-gray-400 outline-none transition-all duration-200 focus:border-indigo-500"
                    ></div>
                    <div
                        v-if="editUser.invitation.code2.distributed"
                        class="m-2 h-10 w-full border-b-[3px] border-blue-300 bg-gray-50 p-2 text-center text-gray-400 outline-none transition-all duration-200 focus:border-indigo-500"
                    >
                        {{ editUser.invitation.code2.code }}
                    </div>
                    <div
                        v-else-if="!editUser.invitation.code2.distributed"
                        class="m-2 h-10 w-full border-b-[3px] border-blue-300 bg-gray-50 p-2 text-center text-gray-400 outline-none transition-all duration-200 focus:border-indigo-500"
                    ></div>
                    <div
                        v-if="editUser.invitation.code3.distributed"
                        class="m-2 h-10 w-full border-b-[3px] border-blue-300 bg-gray-50 p-2 text-center text-gray-400 outline-none transition-all duration-200 focus:border-indigo-500"
                    >
                        {{ editUser.invitation.code3.code }}
                    </div>
                    <div
                        v-else-if="!editUser.invitation.code3.distributed"
                        class="m-2 h-10 w-full border-b-[3px] border-blue-300 bg-gray-50 p-2 text-center text-gray-400 outline-none transition-all duration-200 focus:border-indigo-500"
                    ></div>
                </div>
            </div>
        </div>
    </div>
    <div class="buttonBlock mb-32 flex gap-x-6">
        <button
            class="break-normal bg-gray-100 px-2 text-blue-400 transition-all duration-200 hover:bg-gray-200 hover:text-lg hover:font-bold hover:text-fuchsia-400 sm:px-4"
            @click="switch_type"
        >
            {{ bottonwords[editUser.type].botton }}
        </button>
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
    background-image: linear-gradient(to top, #ffecf5, #ccccff, #acd6ff);
    box-shadow: 0 0 50px gray;
    height: 350px;
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

.infoBlock {
    /* position: relative; */
    /* 水平置中 */
    margin-top: 40px;
    margin-bottom: 40px;
    margin-left: 10%;
}

.buttonBlock {
    margin-left: 47%;
    margin-bottom: 40px;
}

/* .infoBlock:hover {
    height: 1000px;
    margin: 40px 200px 40px 200px;
    background-color: rgb(197, 229, 240);
    position: relative;
    水平置中 
    justify-content: center;
} */
.titleSet {
    position: relative;
    left: 50px;
    border-top-width: 15px;
    border-color: white;
}

.titleText {
    font-size: 18px;
    color: #857f7f;
}

.infoText {
    font-size: 24px;
    color: black;
}

hr {
    width: 400px;
}

/* #ACC0D8 */

/* .aui-info {
    position: relative;
} */

/* .fileInput {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    display: block;
    width: 3.5rem;
    clear: both;
    display: block;
    margin: auto;
    background-color: red;
} */

#defaultImg {
    opacity: 0.3;
    /* filter: alpha(opacity=50); */
}
</style>
