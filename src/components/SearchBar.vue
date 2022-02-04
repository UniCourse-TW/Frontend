<script lang="ts" setup>
const props = defineProps({
    placeholder: { default: "搜尋..." },
    search: { default: false, type: Function },
    advanced: { default: false, type: Function },
    modelValue: { default: "" },
    colorful: { default: false },
});

const emit = defineEmits(["update:modelValue"]);

function default_func(evt: unknown) {
    console.log(evt);
}
</script>

<template>
    <div class="flex w-full items-center justify-center p-6 lg:p-10">
        <div class="flex h-10 w-11/12 max-w-7xl flex-row bg-gray-100 lg:h-14">
            <input
                type="text"
                :placeholder="props.placeholder"
                class="z-[1] flex-1 bg-gray-100 px-4 outline-none transition-all duration-200 hover:bg-gray-200 hover:outline-blue-300 focus:outline-indigo-300"
                @keyup.enter="(props.search || default_func)($event)"
                :value="props.modelValue"
                @input="emit('update:modelValue', ($event.target as any).value)"
            />
            <button
                v-if="props.advanced"
                class="px-4 transition-all duration-200 hover:bg-gray-200"
                @click="(props.advanced || default_func)($event)"
            >
                <RainbowText v-if="colorful">+</RainbowText>
                <span v-else>+</span>
            </button>
            <button class="px-4 transition-all duration-200 hover:bg-gray-200" @click="(props.search || default_func)($event)">
                <RainbowText v-if="colorful">搜尋</RainbowText>
                <span v-else>搜尋</span>
            </button>
        </div>
    </div>
</template>
