const plugins = [
    require("unplugin-auto-import/vite")({
        imports: ["vue", "vue-router", "@vueuse/head"],
        dts: "./src/auto/imports.auto.d.ts",
    }),
    require("unplugin-vue-components/vite")({
        dts: "./src/auto/components.auto.d.ts",
        resolvers: [require("unplugin-icons/resolver")()],
    }),
    require("unplugin-icons/vite")({
        compiler: "vue3",
    }),
];

module.exports = {
    stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    framework: "@storybook/vue3",
    core: {
        builder: "storybook-builder-vite",
    },
    async viteFinal(config) {
        // resolve https://github.com/eirslett/storybook-builder-vite/issues/50
        config.resolve.dedupe = ["@storybook/client-api"];

        config.plugins.push(...plugins);

        return config;
    },
};
