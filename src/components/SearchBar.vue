<script lang="ts" setup>
const props = defineProps({
    placeholder: { default: "搜尋..." },
    search: { default: false, type: [Function, Boolean] },
    advanced: { default: false, type: [Function, Boolean] },
    modelValue: { default: "" },
    colorful: { default: false },
});

const emit = defineEmits(["update:modelValue"]);

const handle_search = computed(() => (typeof props.search === "boolean" ? default_func : props.search));
const handle_advanced = computed(() => (typeof props.advanced === "boolean" ? default_func : props.advanced));

function default_func(evt: unknown) {
    console.log(evt);
}
</script>

<template>
    <div class="flex w-full items-center justify-center p-2 sm:p-6 lg:p-10">
        <div class="flex h-10 w-full max-w-7xl flex-row bg-gray-100 lg:h-14">
            <input
                type="text"
                :placeholder="props.placeholder"
                class="z-[1] flex-1 bg-gray-100 px-2 outline-none transition-all duration-200 hover:bg-gray-200 hover:outline-blue-300 focus:outline-indigo-300 sm:px-4"
                @keyup.enter="handle_search($event)"
                :value="props.modelValue"
                @input="emit('update:modelValue', ($event.target as any).value)"
            />
            <button
                v-if="props.advanced"
                class="px-2 transition-all duration-200 hover:bg-gray-200 sm:px-4"
                @click="handle_advanced($event)"
            >
                <i-octicon-filter-16 />
            </button>
            <button class="break-normal px-2 transition-all duration-200 hover:bg-gray-200 sm:px-4" @click="handle_search($event)">
                <span :class="colorful ? 'text-rainbow' : ''">搜尋</span>
            </button>
        </div>
    </div>
</template>
