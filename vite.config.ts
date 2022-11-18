import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

export default defineConfig({
    plugins: [
        vue(),
        Pages(),
        AutoImport({
            imports: ["vue", "vue-router", "@vueuse/head"],
            dts: "./src/auto/imports.auto.d.ts",
        }),
        Components({
            dts: "./src/auto/components.auto.d.ts",
            resolvers: [IconsResolver()],
        }),
        Icons({
            compiler: "vue3",
        }),
    ],
    define: {
        global: {},
    },
});
