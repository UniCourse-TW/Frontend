<script lang="ts" setup>
const props = defineProps({
    label: { default: "" },
    placeholder: { default: "" },
    modelValue: { default: "" },
    enter: { default: false, type: Function },
    type: { default: "text", type: String },
});

const emit = defineEmits(["update:modelValue"]);

function default_func(evt: unknown) {
    console.log(evt);
}
</script>

<template>
    <div class="my-2 w-full">
        <label class="text-lg text-blue-500">
            {{ props.label }} <br />
            <input
                :type="props.type"
                :placeholder="props.placeholder"
                class="m-2 w-full border-b-[3px] border-blue-300 p-2 text-indigo-500 outline-none transition-all duration-200 focus:border-indigo-500"
                @keyup.enter="(props.enter || default_func)($event)"
                :value="props.modelValue"
                @input="emit('update:modelValue', ($event.target as any).value)"
            />
        </label>
    </div>
</template>
