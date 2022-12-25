import type { User } from "./types";
import { createPinia, defineStore } from "pinia";

const get_token = () => {
    return localStorage.getItem("unicourse") || undefined;
};

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
            location.replace("/");
        },
    },
});

export const pinia = createPinia();
export const store = use_store(pinia);
export default use_store;
