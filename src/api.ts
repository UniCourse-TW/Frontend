import type { CourseMeta, CourseInfo, CourseListQuery, PostListQuery, PostMeta, Post } from "./types";
import uni from "./uni";

export const posts = {
    async get_latest(): Promise<PostMeta[]> {
        const data = (await uni.req("posts/latest")) as PostMeta[];
        return data;
    },
    async get_list(query: PostListQuery): Promise<PostMeta[]> {
        const qs = new URLSearchParams(Object.entries(query)).toString();
        const data = (await uni.req(`posts?${qs}`)) as PostMeta[];
        return data;
    },
    async get(id: string): Promise<Post> {
        const data = (await uni.req(`posts/${id}`)) as Post;
        return data;
    },
};

export const courses = {
    async list(query: CourseListQuery): Promise<CourseMeta[]> {
        const qs = new URLSearchParams(Object.entries(query)).toString();
        const data = (await uni.req(`courses?${qs}`)) as CourseMeta[];
        return data;
    },
    async info(key = ""): Promise<CourseInfo> {
        const data = (await uni.req(`courses/${key}`)) as CourseInfo;
        return data;
    },
};
