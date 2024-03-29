/// <reference types="vite/client" />

declare module "*.vue" {
    import type { DefineComponent } from "vue";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type AnyObj = { [key: string]: any };

interface ImportMetaEnv {
    readonly API_BASE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare const API_BASE: string;
