<script lang="ts" setup>
defineProps({
    featured: { default: false, type: Boolean },
});
</script>

<template>
    <div
        :class="[
            'h-40 w-full overflow-hidden overflow-y-auto rounded border bg-white p-3 shadow shadow-blue-200 transition-all hover:shadow-md hover:shadow-indigo-200 sm:px-5 lg:px-6',
            featured ? 'border-purple-300 bg-gradient-to-r from-indigo-50 via-fuchsia-50 to-fuchsia-50' : '',
        ]"
    >
        <slot></slot>
    </div>
</template>
