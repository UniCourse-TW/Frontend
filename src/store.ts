import type { User } from "./types";

const store = reactive({
    user: null as User | null,
});

export default store;
