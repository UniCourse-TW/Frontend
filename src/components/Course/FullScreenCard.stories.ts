import FullScreenCard from "./FullScreenCard.vue";

export default { title: "Course / FullScreenCard", component: FullScreenCard };

function Template(args: AnyObj) {
    return {
        components: { FullScreenCard },
        template: '<FullScreenCard v-bind="args" />',
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
    programs: ["音樂科技學程", "資訊科技應用學程", "人工智慧技術與應用學"],
    comment: "預計以授權碼加開名額，請同學開學時檢附程式設計(一)修課成績單向老師洽詢授權碼。",
    restrict: "◎必須先修過【CSU0001  程式設計（一）】",
    hours: 3,
    description: "本課程介紹 C 程式語言之進階語法，包含字串、結構、檔案處理、預處理器、巨集等，並帶入資料結構的實做。",
    goals: ["能以C++ 程式語言開發軟體。", "能分析所撰寫程式碼之優缺點，並提出改進之構想。"],
    syllabus:
        "1\\. String\n\n2\\. Struct\n\n3\\. File Processing\n\n4\\. Bitwise operation\n\n5\\. Macro\n\n6\\. Variable-Length Argument Lists\n\n7\\. Some Techniques: assert, perror, \\_\\_LINE\\_\\_, \\_\\_FILE\\_\\_\n\n8\\. Data Structure: Linked List",
    methodologies: [
        {
            type: "講述法",
            note: "教學投影片",
        },
        {
            type: "實驗/實作",
            note: "上機實做",
        },
    ],
    grading: [
        {
            type: "作業",
            weight: 50,
            note: "程式作業",
        },
        {
            type: "期中考",
            weight: 15,
            note: "期中考",
        },
        {
            type: "期末考",
            weight: 15,
            note: "期末考",
        },
        {
            type: "專題",
            weight: 20,
            note: "期末專題",
        },
    ],
    prerequisite: "◎必須先修過【CSU0001  程式設計（一）】",
    general_core: [],
    rating: {
        gpa: 2.9,
        easy: 1.5,
        usefulness: 4.6,
    },
    reviews: [
        {
            content: "content:F4gDw9DZKnjxi9gB6WdBe45W4sGOOV1e",
            time: "2020-04-20T16:00:00.000Z",
            user: "user:s53j-cXeY",
            rating: {
                gpa: 1,
                easy: 1,
                usefulness: 2,
            },
        },
        {
            content: "content:Irb4QWiz5e4bvBbihtszUe6jUyEPr0wc",
            time: "2020-04-20T16:00:00.000Z",
            user: "user:Ykk8-K5zz",
            rating: {
                gpa: 4,
                easy: 2,
                usefulness: 1,
            },
        },
        {
            content: "content:pvf4B4rUzyzT1J2YslQkqoObJXpdU8sz",
            time: "2020-04-20T16:00:00.000Z",
            user: "user:5buM-M6BF",
            rating: {
                gpa: 1,
                easy: 1,
                usefulness: 4,
            },
        },
        {
            content: "content:dO8X0D8mLZYxXswSiG93xI3xGDLFBLoT",
            time: "2020-04-20T16:00:00.000Z",
            user: "user:0aIl-Xk2R",
            rating: {
                gpa: 4,
                easy: 2,
                usefulness: 1,
            },
        },
        {
            content: "content:Ticfw7tPiTlkuzGLMxniebPD48R2JwAK",
            time: "2020-04-20T16:00:00.000Z",
            user: "user:u9hr-7JaT",
            rating: {
                gpa: 4,
                easy: 1,
                usefulness: 2,
            },
        },
    ],
};
