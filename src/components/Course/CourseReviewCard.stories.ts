import CourseReviewCard from "./CourseReviewCard.vue";

export default { title: "Course / CourseReviewCard", component: CourseReviewCard };

function Template(args: AnyObj) {
    return {
        components: { CourseReviewCard },
        template: '<CourseReviewCard v-bind="args" />',
        setup: () => ({ args }),
    };
}

type T = typeof Template & { args?: unknown };

export const loading = Template.bind({}) as T;
loading.args = {};

export const normal = Template.bind({}) as T;
normal.args = {
    review: {
        user: "學生 A",
        content: "這是一個很好的課程，老師**上課有趣**，教了很多東西，*但我還是不會*。",
        time: new Date("2022-02-09").toISOString(),
        rating: {
            sweetness: 4,
            easiness: 5,
            usefulness: 5,
        },
    },
};
