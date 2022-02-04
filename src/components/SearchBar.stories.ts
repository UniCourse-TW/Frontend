import SearchBar from "./SearchBar.vue";

export default { title: "Component / SearchBar", component: SearchBar };

function Template(args: AnyObj) {
    return {
        components: { SearchBar },
        template: '<SearchBar v-bind="args" />',
        setup: () => ({ args }),
    };
}

type T = typeof Template & { args?: unknown };

export const normal = Template.bind({}) as T;
normal.args = {};

export const advanced = Template.bind({}) as T;
advanced.args = { advanced: () => console.log("advanced") };

export const colorful = Template.bind({}) as T;
colorful.args = { colorful: true };
