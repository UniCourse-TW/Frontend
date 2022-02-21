import SoloForumArtical from "./SoloForumArtical.vue";

export default { title: "Forum / SoloForumArtical", component: SoloForumArtical };

function Template(args: AnyObj) {
    return {
        components: { SoloForumArtical },
        template: '<SoloForumArtical v-bind="args" />',
        setup: () => ({ args }),
    };
}

type T = typeof Template & { args?: unknown };

export const normal = Template.bind({}) as T;
normal.args = {
    post: {
        id: "作者id",
        type: "review",
        author: "作者名稱",
        title: "文章標題",
        content:
            "文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文文章內文",
        time: "2022-02-02",
        vote: {
            up: 4,
            down: 5,
        },
        tags: [],
        course: {
            year: 110,
            term: 2,
            serial: 1,
            name: "課程名稱",
            teacher: "授課教授",
            rating: {
                sweetness: 2,
                easiness: 3,
                usefulness: 1,

                count: 50,
            },
        },
    },

    post_rating: {
        sweetness: 5,
        easiness: 4,
        usefulness: 3,
    },
};
