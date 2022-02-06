<script lang="ts" setup>
defineProps({});

const show_full = ref(false);

function show() {
    show_full.value = true;
}

function hide(evt: MouseEvent) {
    if (evt.target === evt.currentTarget) {
        show_full.value = false;
    }
    return undefined;
}
</script>

<template>
    <div
        class="h-40 w-full cursor-pointer rounded border bg-white p-4 shadow shadow-blue-200 transition-all hover:shadow-md hover:shadow-indigo-200 sm:p-5 lg:p-6"
        @click="show"
    >
        <slot name="activator">
            <div>
                <span class="text-lg">Modal Activator Here</span> <br />
                Click me to open Modal
            </div>
        </slot>
    </div>

    <transition name="full-card">
        <template v-if="show_full">
            <div
                class="fixed top-0 left-0 z-20 h-screen w-screen bg-black bg-opacity-50 pt-4 sm:px-8 sm:pt-6 lg:px-12 lg:pt-8"
                @click="hide"
            >
                <div data-locator="card" class="card-body h-full w-full overflow-hidden rounded-t-2xl bg-white p-4">
                    <div class="h-full overflow-y-auto overflow-x-hidden break-words">
                        <slot name="content">
                            <div class="text-lg">Modal Content Here</div>
                        </slot>
                    </div>
                    <span class="absolute top-3 right-3 cursor-pointer p-2" @click="hide">X</span>
                </div>
            </div>
        </template>
    </transition>
</template>

<style scoped>
.full-card-enter-active {
    transition: all 0.3s ease;
}
.full-card-leave-active {
    transition: all 0.3s ease 0.2s;
}

.full-card-enter-from,
.full-card-leave-to {
    opacity: 0;
}

.full-card-enter-active >>> [data-locator="card"],
.full-card-leave-active >>> [data-locator="card"] {
    transition: all 0.25s ease-in-out;
}

.full-card-enter-from >>> [data-locator="card"],
.full-card-leave-to >>> [data-locator="card"] {
    transform: translateY(100vh);
}
</style>
