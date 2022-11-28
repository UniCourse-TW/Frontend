import type { User } from "./types";
import { defineStore } from "pinia";

const get_token = () => localStorage.getItem("unicourse") || undefined;

const use_store = defineStore("coolest-store", {
    state: () => ({
        user: null as User | null,
        token: get_token(),
    }),
    getters: {
        logged_in: (state) => Boolean(state.token),
    },
    actions: {
        login() {
            this.token = get_token();
        },
        logout() {
            localStorage.removeItem("unicourse");
            this.token = get_token();
        },
    },
});

export default use_store;
