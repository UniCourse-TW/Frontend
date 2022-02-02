<script lang="ts" setup>
useHead({ title: "UniCourse" });
</script>

<template>
    <div id="cover" w="screen" h="screen" bg="gradient-to-br" class="absolute top-0 from-cyan-400 via-indigo-200 to-fuchsia-200">
        <img src="../assets/banner.svg" w="full" h="1/5 sm:1/4 lg:1/3" />
        <div w="full" h="4/5 sm:3/4 lg:2/3" p="2 sm:x-4 lg:x-6">
            <div w="full lg:1/2" h="1/2 lg:full" p="b-1 sm:b-2 lg:r-3" class="inline-block">
                <div w="full" h="full" p="3" bg="white opacity-40" text="center" shadow="lg hover:xl" class="rounded-lg transition-all">
                    <RainbowText content="最完整的課程資訊" class="text-2xl" />
                    <hr
                        w="3/4"
                        h="0.5"
                        m="y-1.5 x-auto"
                        border="none"
                        bg="gradient-to-r"
                        class="from-cyan-600 via-indigo-600 to-fuchsia-600"
                    />
                    <p>多少課程？ 從哪些平台整合？ 總共被查詢了多少次？ 其他數據？</p>
                </div>
            </div>
            <div w="full lg:1/2" h="1/2 lg:full" p="t-1 sm:t-2 lg:l-3" class="inline-block">
                <div w="full" h="full" p="3" bg="white opacity-40" shadow="lg hover:xl" text="center" class="rounded-lg transition-all">
                    <RainbowText content="廣大的使用者社群" class="text-2xl" />
                    <hr
                        w="3/4"
                        h="0.5"
                        m="y-1.5 x-auto"
                        border="none"
                        bg="gradient-to-r"
                        class="from-cyan-600 via-indigo-600 to-fuchsia-600"
                    />
                    <p>多少人使用？ 有多少文章？ 有多少提問已被回答？ 其他數據？</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
