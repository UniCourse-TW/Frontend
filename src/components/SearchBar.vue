<script lang="ts" setup>
const props = defineProps({
    placeholder: { default: "搜尋..." },
    search: { default: <any>(() => undefined) },
    advanced: { default: <any>(() => undefined) },
    modelValue: { default: "" },
});

defineEmits(["update:modelValue"]);
</script>

<template>
    <div class="flex w-full items-center justify-center p-6 lg:p-10">
        <div class="flex h-10 w-11/12 max-w-7xl flex-row bg-gray-100 lg:h-14">
            <input
                type="text"
                :placeholder="props.placeholder"
                class="z-[1] flex-1 bg-gray-100 px-4 outline-none transition-all duration-200 hover:bg-gray-200 hover:outline-blue-300 focus:outline-indigo-300"
                @keyup.enter="props.search"
                :value="props.modelValue"
                @input="$emit('update:modelValue', ($event.target as any).value)"
            />
            <button v-if="props.advanced" class="px-4 transition-all duration-200 hover:bg-gray-200" @click="props.advanced">+</button>
            <button class="px-4 transition-all duration-200 hover:bg-gray-200" @click="props.search">搜尋</button>
        </div>
    </div>
</template>
