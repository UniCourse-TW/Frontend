import type { User } from "./types";
import { defineStore } from "pinia";

const use_store = defineStore("coolest-store", {
    state: () => ({
        user: null as User | null,
    }),
});

export default use_store;
