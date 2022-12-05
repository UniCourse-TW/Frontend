import type { UserProfile } from "@unicourse-tw/prisma";
import { UniCourse, UniCourseApiError } from "unicourse";
import { reactive } from "vue";
import Swal from "sweetalert2";
import { store } from "./store";
import router from "./router";

export const uni = new UniCourse(store.token, {
    server: API_BASE,
});

((login: typeof uni.login) => {
    uni.login = async (username: string, password: string) => {
        const result = await login(username, password);
        if (uni.raw_token) {
            localStorage.setItem("unicourse", uni.raw_token);
        }
        return result;
    };
})(uni.login.bind(uni));

((req: typeof uni.req) => {
    uni.req = (async (...params: Parameters<typeof uni.req>) => {
        try {
            return await req(...params);
        } catch (err) {
            if (err instanceof Error) {
                Swal.fire({
                    title: "錯誤",
                    text: err.message,
                    icon: "error",
                }).then(() => {
                    if (err instanceof UniCourseApiError) {
                        if (err.status === 401) {
                            router?.push("/auth");
                        }
                    }
                });
            }

            throw err;
        }
    }) as typeof uni.req;
})(uni.req.bind(uni));

export default uni;

const user_cache = new Map<unknown, UserProfile>();
export function user(id: unknown): UserProfile {
    if (!user_cache.has(id)) {
        const u = reactive<UserProfile>({
            id: "...",
            user_id: "...",
            name: "...",
            bio: "...",
            school: "...",
            email: "",
            location: "",
            banner: "",
            avatar: "https://unicourse-tw.github.io/Public-Assets/icon/UniCourse_icon_fade.256x256.png",
            extra: {},
        });
        if (typeof id === "string") {
            uni.profile(id).then((p) => {
                console.log(`[Uni] Fetched profile of ${id}`, p);
                Object.assign(u, p);
                user_cache.set(u.id, u);
                user_cache.set(u.user_id, u);
            });
        }
        user_cache.set(id, u);
    }
    return user_cache.get(id) as UserProfile;
}
