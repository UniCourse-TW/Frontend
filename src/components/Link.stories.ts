import Link from "./Link.vue";

export default { title: "Component / Link", component: Link };

function Template(args: AnyObj) {
    return {
        components: { Link },
        template: '<Link v-bind="args"> Link </Link>',
        setup: () => ({ args }),
    };
}

type T = typeof Template & { args?: unknown };

export const internal = Template.bind({}) as T;
internal.args = { to: "/abc" };

export const external = Template.bind({}) as T;
external.args = { to: "https://www.google.com" };
