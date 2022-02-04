import Input from "./Input.vue";

export default { title: "Component / Input", component: Input };

function Template(args: AnyObj) {
    return {
        components: { Input },
        template: '<Input v-bind="args" />',
        setup: () => ({ args }),
    };
}

type T = typeof Template & { args?: unknown };

export const normal = Template.bind({}) as T;
normal.args = { label: "標籤", placeholder: "請輸入標籤" };
