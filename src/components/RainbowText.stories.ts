import RainbowText from "./RainbowText.vue";

export default { title: "Text / RainbowText", component: RainbowText };

function Template(args: AnyObj) {
    return {
        components: { RainbowText },
        template: '<RainbowText v-bind="args"> {{ args.slot }} </RainbowText>',
        setup: () => ({ args: { ...args, slot: args.slot || "UniCourse" } }),
    };
}

type T = typeof Template & { args?: unknown };

export const normal = Template.bind({}) as T;
normal.args = {};

export const bold = Template.bind({}) as T;
bold.args = { bold: true };

export const italic = Template.bind({}) as T;
italic.args = { italic: true };

export const reversed = Template.bind({}) as T;
reversed.args = { reversed: true };

export const custom_classes = Template.bind({}) as T;
custom_classes.args = {
    class: "rounded text-2xl p-2 outline-indigo-500 transition-all duration-300 hover:drop-shadow hover:font-bold hover:outline",
};
