import { EndpointRequestBody, EndpointResponseBody, POST } from "unicourse";
import type { CourseMeta, CourseListQuery, PostListQuery, PostMeta } from "./types";
import uni from "./uni";

export const posts = {
    async get_latest(): Promise<EndpointResponseBody<"posts/latest">> {
        const data = await uni.req("posts/latest");
        return data;
    },
    async get_list(query: PostListQuery): Promise<PostMeta[]> {
        const qs = new URLSearchParams(Object.entries(query)).toString();
        const data = (await uni.req(`posts?${qs}`)) as PostMeta[];
        return data;
    },
    async get(id: string): Promise<EndpointResponseBody<`posts/${string}`>> {
        const data = await uni.req(`posts/${id}`);
        return data;
    },
    async create(body: EndpointRequestBody<`posts`, typeof POST>): Promise<EndpointResponseBody<`posts`, typeof POST>> {
        const data = await uni.req(`posts`, {
            method: "POST",
            body,
        });
        return data;
    },
};

export const courses = {
    async list(query: CourseListQuery): Promise<CourseMeta[]> {
        const qs = new URLSearchParams(Object.entries(query)).toString();
        const data = (await uni.req(`courses?${qs}`)) as CourseMeta[];
        return data;
    },
    async info(key = ""): Promise<EndpointResponseBody<`courses/${string}`>> {
        const data = await uni.req(`courses/${key}`);
        return data;
    },
};
