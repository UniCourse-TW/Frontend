import { ConfigEnv, defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default ({ mode }: ConfigEnv) =>
    defineConfig({
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
            API_BASE:
                mode === "development" && process.env.DEV_API_BASE
                    ? `"${process.env.DEV_API_BASE}"`
                    : mode === "production" && process.env.PROD_API_BASE
                    ? `"${process.env.PROD_API_BASE}"`
                    : `"https://api.unicourse.tw"`,
        },
    });
