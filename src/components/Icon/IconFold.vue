<script lang="ts" setup>
const props = defineProps({
    fold: { default: false },
    class: { default: "" },
});
</script>

<template>
    <transition
        enter-active-class="duration-150 ease-out"
        enter-from-class="opacity-0 scale-y-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-150 ease-in"
        leave-class="opacity-100"
        leave-to-class="opacity-0 scale-y-0"
    >
        <i-octicon-unfold-16 :class="props.class" v-if="props.fold" />
        <i-octicon-fold-16 :class="props.class" v-else />
    </transition>
</template>
