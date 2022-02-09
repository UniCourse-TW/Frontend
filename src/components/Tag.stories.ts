import Tag from "./Tag.vue";

export default {
    title: "Component / Tag",
    component: Tag,
};

function Template(args: AnyObj) {
    return {
        components: { Tag },
        template: '<Tag v-bind="args" />',
        setup: () => ({ args }),
    };
}

type T = typeof Template & { args?: unknown };

export const normal = Template.bind({}) as T;
normal.args = {
    content: "Type Something",
};

export const border = Template.bind({}) as T;
border.args = {
    ...(normal.args as AnyObj),
    border: true,
};

export const color = Template.bind({}) as T;
color.args = {
    content: "Specified Color",
    color: "indigo",
};

export const reversed = Template.bind({}) as T;
reversed.args = {
    ...(normal.args as AnyObj),
    reversed: true,
};
