<script lang="ts" setup>
const props = defineProps({
    label: { default: "" },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
    <div class="my-2 w-full">
        <label class="text-lg text-blue-500">
            {{ props.label }} <br />
            <input
                class="m-2 w-full border-b-[3px] border-blue-300 p-2 text-indigo-500 outline-none transition-all duration-200 focus:border-indigo-500"
                v-bind="$attrs"
                @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                v-bind:value="$attrs.modelValue || $attrs.value"
            />
        </label>
    </div>
</template>
