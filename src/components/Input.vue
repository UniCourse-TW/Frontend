<script lang="ts" setup>
const props = defineProps({
    label: { default: "" },
    placeholder: { default: "" },
    modelValue: { default: "" },
    enter: { default: (payload?: KeyboardEvent) => undefined },
});

defineEmits(["update:modelValue"]);
</script>

<template>
    <div class="my-2 w-full">
        <label class="text-lg text-blue-500">
            {{ props.label }} <br />
            <input
                type="text"
                :placeholder="props.placeholder"
                class="m-2 w-full border-b-[3px] border-blue-300 p-2 text-indigo-500 outline-none transition-all duration-200 focus:border-indigo-500"
                @keyup.enter="props.enter"
                :value="props.modelValue"
                @input="$emit('update:modelValue', ($event.target as any).value)"
            />
        </label>
    </div>
</template>
