import Rating from "./Rating.vue";

export default { title: "Component / Rating", component: Rating };

function Template(args: AnyObj) {
    return {
        components: { Rating },
        data: () => ({ value: 3 }),
        template: '<Rating v-bind="args" v-model="value"></Rating>',
        setup: () => ({ args }),
    };
}

type T = typeof Template & { args?: unknown };

export const normal = Template.bind({}) as T;
normal.args = {};
