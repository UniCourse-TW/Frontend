<script lang="ts" setup>
const props = defineProps({
    placeholder: { default: "搜尋..." },
    search: { default: <any>(() => undefined) },
    advanced: { default: <any>undefined },
    modelValue: { default: "" },
});

const emits = defineEmits(["update:modelValue"]);
</script>

<template>
    <div w="full" flex="~" p="6 lg:10" class="justify-center items-center">
        <div bg="gray-100" w="11/12" h="10 lg:14" max-w="1200px" flex="~ row">
            <input
                type="text"
                :placeholder="props.placeholder"
                bg="gray-100 hover:gray-200"
                flex="1"
                p="x-4"
                z="1"
                outline="none hover:solid-blue-300 focus:solid-indigo-300"
                class="transition-all duration-200"
                @keyup.enter="props.search"
                :value="props.modelValue"
                @input="$emit('update:modelValue', ($event.target as any).value)"
            />
            <button v-if="props.advanced" p="x-4" bg="hover:gray-200" class="transition-all duration-200" @click="props.advanced">+</button>
            <button p="x-4" bg="hover:gray-200" class="transition-all duration-200" @click="props.search">搜尋</button>
        </div>
    </div>
</template>
