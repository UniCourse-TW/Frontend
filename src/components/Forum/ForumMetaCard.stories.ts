import ForumMetaCard from "./ForumMetaCard.vue";

export default { title: "Forum / ForumMetaCard", component: ForumMetaCard };

function Template(args: AnyObj) {
    return {
        components: { ForumMetaCard },
        template: '<ForumMetaCard v-bind="args" />',
        setup: () => ({ args }),
    };
}

type T = typeof Template & { args?: unknown };

export const normal = Template.bind({}) as T;
normal.args = {
    meta: {
        id: "1",
        type: "review",
        author: "Jacob",
        title: "範例文章",
        time: "2022-02-02T00:11:22.333Z",
        vote: {
            up: 3,
            down: 0,
        },
        tags: ["心得"],
        course: null,
    },
    is_loading: false,
};
