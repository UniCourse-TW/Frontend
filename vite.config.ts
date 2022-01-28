import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import Pages from "vite-plugin-pages";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

export default defineConfig({
    plugins: [
        vue(),
        WindiCSS(),
        Pages(),
        AutoImport({
            imports: ["vue", "vue-router", "@vueuse/head"],
            dts: "./src/auto/imports.auto.d.ts",
        }),
        Components({ dts: "./src/auto/components.auto.d.ts" }),
    ],
});
