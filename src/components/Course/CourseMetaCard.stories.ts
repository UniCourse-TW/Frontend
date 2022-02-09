import CourseMetaCard from "./CourseMetaCard.vue";

export default { title: "Course / CourseMetaCard", component: CourseMetaCard };

function Template(args: AnyObj) {
    return {
        components: { CourseMetaCard },
        template: '<CourseMetaCard v-bind="args" />',
        setup: () => ({ args }),
    };
}

type T = typeof Template & { args?: unknown };

export const normal = Template.bind({}) as T;
normal.args = {
    year: 110,
    term: 2,
    name: "程式設計（二）",
    teachers: ["紀博文"],
    department: "資訊工程學系",
    code: "CSU0002",
    credit: 3,
    serial: 2949,
    group: "A",
    quota: {
        limit: 60,
        additional: 10,
    },
    schedule: [
        {
            day: 1,
            from: 7,
            to: 7,
            campus: "公館",
            classroom: "理圖807",
        },
        {
            day: 3,
            from: 8,
            to: 9,
            campus: "公館",
            classroom: "理圖807",
        },
    ],
    programs: ["音樂科技學程", "資訊科技應用學程", "人工智慧技術與應用學程"],
    comment: "預計以授權碼加開名額，請同學開學時檢附程式設計(一)修課成績單向老師洽詢授權碼。",
    restrict: "◎必須先修過【CSU0001  程式設計（一）】",
    tags: [{ name: "程式設計" }, { name: "資訊科技" }, { name: "資訊工程" }],
};

export const featured = Template.bind({}) as T;
featured.args = {
    ...(normal.args as object),
    featured: true,
};
