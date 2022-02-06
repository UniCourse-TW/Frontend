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

export async function get_latest_post(): Promise<PostMeta[]> {
    const res = await fetch(`${server}/v1/api/posts/latest`);
    const meta = (await res.json()) as PostMeta[];
    return meta;
}

export async function get_post_meta(query = "", limit = 20, offset = 0): Promise<PostMeta[]> {
    const res = await fetch(`${server}/v1/api/posts?q=${query}&limit=${limit}&offset=${offset}`);
    const meta = (await res.json()) as PostMeta[];
    return meta;
}
