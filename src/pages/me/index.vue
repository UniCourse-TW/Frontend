<script lang="ts" setup>
useHead({ title: "個人 | UniCourse" });

const router = useRouter();
const username = ref("test");
// router.push({ path: "me/username=", username });
// 1. how to write url?
// var upload = function (c: any, d: any) {
//     "use strict";
//     var $c = document.querySelector(c),
//         $d = document.querySelector(d),
//         file = $c.files[0],
//         reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = function (e) {
//         $d.setAttribute("src", e.target.result);
//     };
// };
</script>

<template>
    <div class="empty setMiddle">
        <div class="gradientBlock"></div>
        <div class="circle">
            <img alt="頭像" src="../../assets/profile/default.svg" class="avatar" />
            <!-- <div class="aui-info">
                <img src="../../assets/profile/default.svg" id="img-txz" style="width: 3rem"
                    class="aui-img-round user-img" />
                <input type="file" accept="image/*" id="file-txz" name="file"
                    onchange="upload('#file-txz', '#img-txz');" class="fileInput" value="" />
            </div> -->
        </div>
    </div>
    <div class="setMiddle setUsername"><b>${username}</b></div>
    <div class="infoBlock">
        <div class="titleSet titleText">account </div>
        <div class="titleSet infoText">account_name
            <hr />
        </div>
        <div class="titleSet titleText ">username</div>
        <div class="titleSet infoText">TEST
            <hr />
        </div>
        <div class="titleSet titleText">password</div>
        <div class="titleSet infoText">asdfjkl;;
            <hr />
        </div>
        <div class="titleSet titleText">email</div>
        <div class="titleSet infoText">123@gmail.com
            <hr />
        </div>
        <div class="titleSet titleText">std_id</div>
        <div class="titleSet infoText">41047999S
            <hr />
        </div>
        <div class="titleSet titleText">verified</div>
        <div class="titleSet infoText">已驗證
            <hr />
        </div>
        <div class="titleSet titleText">badges</div>
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
    background-image: linear-gradient(to top, #FFECF5, #CCCCFF, #ACD6FF);
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
    height: 1000px;
    margin: 40px 200px 40px 200px;
    position: relative;
    /* 水平置中 */
    justify-content: center;

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
