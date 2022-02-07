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
    default: `
    <div class="flex h-full flex-col gap-y-2">
        <div class="flex items-center gap-x-2">
            <img src="https://picsum.photos/seed/1/32/32" class="rounded-full" />
            <span class="text-lg font-bold">大推王老師程設一</span>
        </div>
        <div class="text-gray-600 text-sm">課程：110-1 程式設計（一）</div>

        <div class="flex-1"></div>

        <div class="text-gray-700">#心得</div>
        <div class="text-gray-700 text-sm">2022/02/07 15:38</div>
    </div>`,
};

export const featured = Template.bind({}) as T;
featured.args = {
    featured: true,
};

export const custom_classes = Template.bind({}) as T;
custom_classes.args = {
    class: "cursor-pointer w-1/3 py-4",
    default: `
    <div class="flex h-full flex-col gap-y-2">
        <div class="flex items-center gap-x-2">
            <img src="https://picsum.photos/seed/1/32/32" class="rounded-full" />
            <span class="text-lg font-bold">大推王老師程設一</span>
        </div>
        <div class="text-gray-600 text-sm">課程：110-1 程式設計（一）</div>

        <div class="flex-1"></div>

        <div class="text-gray-700">#心得</div>
        <div class="text-gray-700 text-sm">2022/02/07 15:38</div>
    </div>`,
};
