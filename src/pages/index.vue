<script lang="ts" setup>
useHead({ title: "UniCourse" });
</script>

<template>
    <div id="cover" class="absolute top-0 h-screen w-screen">
        <img src="../assets/banner.svg" class="h-1/5 w-full sm:h-1/4 lg:h-1/3" />
        <div style="margin-top:-50px; text-align:center; color:#8242B5; font-weight:bold">
            選課資訊交流平台
        </div>
        <div class="mx-auto h-2/5 w-full p-2 sm:w-full sm:px-4 lg:w-2/3 lg:px-6">
            <div class="inline-block h-full w-full pb-1 sm:pr-2 sm:h-full sm:w-1/2 lg:h-full lg:w-1/2 lg:pr-2">
                <div class="h-full w-full rounded-lg bg-white bg-opacity-40 p-3 text-center shadow-lg transition-all hover:shadow-xl">
                    <RainbowText class="text-2xl">目前有100位<br>使用者<br></RainbowText>
                    <img src="../assets/front/front0L.svg" class="inline-block h-1/2" />
                </div>
            </div>
            <div class="inline-block h-full w-full pt-1 sm:pl-2 sm:h-full sm:w-1/2 lg:h-full lg:w-1/2 lg:pl-2">
                <div class="h-full w-full rounded-lg bg-white bg-opacity-40 p-3 text-center shadow-lg transition-all hover:shadow-xl">
                    <RainbowText class="text-2xl">累計了100篇<br>文章<br></RainbowText>
                    <img src="../assets/front/front0R.svg" class="inline-block h-1/2" />
                </div>
            </div>
        </div>
        <div class="mx-auto h-2/5 w-full p-2 sm:h-1/2 sm:px-4 lg:h-2/3 lg:w-2/3 lg:px-6">
            <div class="h-full w-full rounded-lg bg-white bg-opacity-40 p-3 text-center shadow-lg transition-all hover:shadow-xl">
                
                <img src="../assets/front/front01_transBG.svg" class="inline-block h-full w-2/5" />
                <div class="inline-block h-full w-1/2">
                    <div class="p-1 m-auto sm:p-5 lg:p-5">
                        <font color="#8242B5">找到你有興趣的課程資訊</font>
                    </div>
                    <input type="button" value="搜尋課程" onclick="location.href='course'" style="width:120px;height:40px;font-size:15px;background-color:#8242B5; color:#fff;border-radius: 5px;">

                </div>
            </div>
        </div>
        <div class="mx-auto h-2/5 w-full p-2 sm:h-1/2 sm:px-4 lg:h-2/3 lg:w-2/3  lg:px-6">
            <div class="h-full w-full rounded-lg bg-white bg-opacity-40 p-3 text-center shadow-lg transition-all hover:shadow-xl">
                
                <img src="../assets/front/front02_transBG.svg" class="inline-block h-full w-2/5" />
                <div class="inline-block h-full w-1/2 ">
                    
                    <div class="p-1 m-auto sm:p-5 lg:p-5">
                        <font color="#8242B5">回答他人提出的課程相關問題</font>
                    </div>
                    <input type="button" value="解答疑問" onclick="location.href='forum'" style="width:120px;height:40px;font-size:15px;background-color:#8242B5; color:#fff;border-radius: 5px;">
                </div>
            </div>
        </div>
        <div class="mx-auto h-2/5 w-full p-2 sm:h-1/2 sm:px-4 lg:h-2/3 lg:w-2/3 lg:px-6">
            <div class="h-full w-full rounded-lg bg-white bg-opacity-40 p-3 text-center shadow-lg transition-all hover:shadow-xl">
                
                <img src="../assets/front/front03_transBG.svg" class="inline-block h-full w-2/5" />
                <div class="inline-block h-full w-1/2 ">
                    <div class="p-1 m-auto sm:p-5 lg:p-5">
                        <font color="#8242B5">和其他人分享你的修課心得</font>
                    </div>
                    <input type="button" value="撰寫心得" onclick="location.href='forum'" style="width:120px;height:40px;font-size:15px;background-color:#8242B5; color:#fff;border-radius: 5px;">
                </div>
            </div>
        </div>
        <div class="h-1/4 w-full text-center mx-auto p-5 lg:w-2/3">
            <font>加入我們 / find us<br/></font>
            <div class="mx-auto w-1/5 p-3">
                <button type="button" class="w-1/5 my-auto m-2" onclick="location.href='DC連結'"><img src="../assets/front/dc_icon/dc_icon_black.png"></button>
                <button type="button" class="w-1/5 my-auto m-2" onclick="location.href='FB連結'"><img src="../assets/front/fb_icon/fb_icon_black.png"></button>
            </div>
        </div>
    </div>
    
</template>

<style scoped>
    /* .divBox {
        background: green;
    } */
</style>
