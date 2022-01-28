import type { CourseMeta, CourseInfo } from "./types";
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
