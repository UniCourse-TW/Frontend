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
    route: { path: "/" },
    store: { user: null },
};

export const others = Template.bind({}) as T;
others.args = {
    route: { path: "/others" },
    store: { user: null },
};

export const logged_in = Template.bind({}) as T;
logged_in.args = {
    route: { path: "/others" },
    store: { user: {} },
};
