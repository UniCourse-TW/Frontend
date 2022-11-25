import type { User } from "./types";
import { defineStore } from "pinia";
import uni from "./uni";

const use_store = defineStore("coolest-store", {
    state: () => ({
        user: null as User | null,
        username: null as string | null,
        logged_in: uni.is_valid(),
    }),
    actions: {
        login(username: string) {
            this.username = username;
            this.logged_in = uni.is_valid();
        },
        logout() {
            localStorage.removeItem("unicourse");
            this.logged_in = uni.is_valid();
        },
    },
});

export default use_store;
