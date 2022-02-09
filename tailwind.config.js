module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [
        ...[
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
        ]
            .map((c) => [`text-${c}-500`, `text-${c}-50`, `border-${c}-500`, `bg-${c}-500`])
            .flat(),
        ...Array.from({ length: 8 }, (_, i) => `text-gray-${(i + 1) * 100}`),
    ],
};
