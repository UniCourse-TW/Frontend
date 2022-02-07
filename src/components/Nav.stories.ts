import Nav from "./Nav.vue";

export default { title: "Component / Nav", component: Nav };

function Template(args: AnyObj) {
    return {
        components: { Nav },
        template: '<Nav v-bind="args" />',
        setup: () => ({ args }),
    };
}

type T = typeof Template & { args?: unknown; decorators?: unknown[] };

export const home = Template.bind({}) as T;
home.args = {
    path: "/",
    logged_in: false,
};

export const others = Template.bind({}) as T;
others.args = {
    path: "/others",
    logged_in: false,
};

export const logged_in = Template.bind({}) as T;
logged_in.args = {
    path: "/others",
    logged_in: true,
};
