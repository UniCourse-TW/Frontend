import type { Response, CourseMeta, CourseInfo, CourseListQuery, PostListQuery, PostMeta, Post } from "./types";
import { server } from "./config";

async function req(...params: [RequestInfo, RequestInit?]): Promise<unknown> {
    try {
        if (typeof params[0] === "string") {
            params[0] = server + "/" + params[0].replace(/^\//, "");
        }

        const cache = false;

        if (cache) {
            console.log("[API] Cache Hit", params);
            /* cache get & return */
        } else {
            console.log("[API] Send", params);
            const res = await fetch(...params);
            const json = (await res.json()) as Response;
            console.log("[API] Receive", json);

            if (json.success === false) {
                throw json.err;
            }

            if (json.token) {
                /* update token if needed */
            }

            /* cache put */

            return json.data;
        }
    } catch (err) {
        if (err instanceof Error) {
            throw {
                title: "UNKNOWN_ERROR",
                message: err.name + ":\n" + err.message + "\n" + err.stack,
            };
        } else {
            throw err;
        }
    }
}

export const posts = {
    async get_latest(): Promise<PostMeta[]> {
        const data = (await req("posts/latest")) as PostMeta[];
        return data;
    },
    async get_list(query: PostListQuery): Promise<PostMeta[]> {
        const qs = new URLSearchParams(Object.entries(query)).toString();
        const data = (await req(`posts?${qs}`)) as PostMeta[];
        return data;
    },
    async get(id: string): Promise<Post> {
        const data = (await req(`posts/${id}`)) as Post;
        return data;
    },
};

export const courses = {
    async list(query: CourseListQuery): Promise<CourseMeta[]> {
        const qs = new URLSearchParams(Object.entries(query)).toString();
        const data = (await req(`courses?${qs}`)) as CourseMeta[];
        return data;
    },
    async info(key = ""): Promise<CourseInfo> {
        const data = (await req(`courses/${key}`)) as CourseInfo;
        return data;
    },
};
