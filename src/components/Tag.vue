<script lang="ts" setup>
const props = defineProps({
    content: { default: "" },
    background: { default: true },
    border: { default: false },
    reversed: { default: false },
    color: { default: "", type: [String, Number] },
});

const colors = [
    "red",
    "orange",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
] as const;

const color = props.color
    ? typeof props.color === "number"
        ? colors[props.color % colors.length]
        : props.color
    : colors[content_hash(props.content)];

function content_hash(content: string) {
    return content.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
}
</script>

<template>
    <div
        :class="[
            'inline-block rounded px-1 py-0.5 text-xs sm:text-sm',
            `text-${color}-500`,
            props.background && `bg-${color}-500`,
            props.border && `border border-${color}-500`,
            props.reversed ? `text-${color}-50` : ` bg-opacity-10`,
        ]"
    >
        <span>{{ props.content }}</span>
    </div>
</template>
