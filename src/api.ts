import type { Response, CourseMeta, CourseInfo, CourseListQuery, PostMeta } from "./types";
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

const meta: PostMeta[] = [
    {
        id: "1",
        type: "review",
        author: "L1nux Ch1",
        title: "大推王老師的程設課",
        time: "2022-02-06T07:23:59.952Z",
        vote: {
            up: 3,
            down: 0,
        },
        tags: ["程式設計", "心得"],
        course: {
            year: 110,
            term: 1,
            serial: 0,
            name: "程式設計（一）",
            teacher: "Dr. Wang",
        },
    },
    {
        id: "2",
        type: "question",
        author: "Bogay",
        title: "求推薦不點名的體育課",
        time: "2022-02-06T07:23:59.952Z",
        vote: {
            up: 2,
            down: 10,
        },
        tags: ["體育"],
        course: null,
    },
];

export async function get_latest_post(): Promise<PostMeta[]> {
    // const res = await fetch(`${server}/v1/api/posts/latest`);
    // const meta = (await res.json()) as PostMeta[];
    return meta;
}

export async function get_post_meta(query = "", limit = 20, offset = 0): Promise<PostMeta[]> {
    // const res = await fetch(`${server}/v1/api/posts?q=${query}&limit=${limit}&offset=${offset}`);
    // const meta = (await res.json()) as PostMeta[];
    return meta;
}
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
