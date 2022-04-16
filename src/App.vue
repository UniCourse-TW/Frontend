<script lang="ts" setup>
import use_store from "./store";

const route = useRoute();
const store = use_store();
</script>

<template>
    <div class="dark">
        <Nav :path="route.path" :logged_in="!!store.user" />

        <router-view v-slot="{ Component }">
            <transition name="page-transition" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<style scoped>
.page-transition-enter-active,
.page-transition-leave-active {
    transition: all 0.35s ease;
}

.page-transition-enter-from,
.page-transition-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>
