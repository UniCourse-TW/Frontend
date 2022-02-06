import type { CourseMeta, CourseInfo, PostMeta } from "./types";
import { server } from "./config";

fetch(server);

export async function get_course_meta(search = ""): Promise<CourseMeta[]> {
    const res = await fetch(`${server}/v1/api/course/meta?search=${encodeURIComponent(search)}`);
    const meta = (await res.json()) as CourseMeta[];
    return meta;
}

export async function get_course_info(key = ""): Promise<CourseInfo> {
    const res = await fetch(`${server}/v1/api/course/info?key=${encodeURIComponent(key)}`);
    const info = (await res.json()) as CourseInfo;
    return info;
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
