import Card from "./Card.vue";

export default { title: "Component / Card", component: Card };

function Template(args: AnyObj) {
    return {
        components: { Card },
        template: `
        <Card v-bind="args">
          <template v-if="${"default" in args}" v-slot>${args.default}</template>
        </Card>`,
        setup: () => ({ args }),
    };
}

type T = typeof Template & { args?: unknown };

export const normal = Template.bind({}) as T;
normal.args = {
    default: `<div class="py-2 text-lg font-bold">早上好中國</div>`,
};

export const featured = Template.bind({}) as T;
featured.args = {
    featured: true,
};

export const custom_classes = Template.bind({}) as T;
custom_classes.args = {
    class: "h-20 text-center w-1/2",
    default: `<div class="py-2 text-lg font-bold">早上好中國</div>`,
};
