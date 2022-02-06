export interface CourseQuota {
    /**
     * 一般名額
     */
    limit: number;

    /**
     * 授權碼名額
     */
    additional: number;
}

export interface CourseTime {
    /**
     * 星期幾 1 ~ 7, -1 表示密集課程, 0 表示處理失敗
     */
    day: number;

    /**
     * 第幾節開始 11 ~ 14: A ~ D
     */
    from: number;

    /**
     * 第幾節結束 11 ~ 14: A ~ D
     */
    to: number;
}

export interface CourseLocation {
    /**
     * 校區
     */
    campus: string;

    /**
     * 教室
     */
    classroom: string;
}

export interface CourseMeta {
    /**
     * 開課學年度
     */
    year: number;
    /**
     * 開課學期
     */
    term: number;
    /**
     * 課程名稱
     */
    name: string;
    /**
     * 授課教師
     */
    teachers: string[];
    /**
     * 開課系所
     */
    department: string;
    /**
     * 學分數
     */
    credit: number;
    /**
     * 科目代碼
     */
    code: string;
    /**
     * 開課序號
     */
    serial: number;
    /**
     * 課程組別
     */
    group: string;
    /**
     * 名額
     */
    quota: CourseQuota;
    /**
     * 時間地點
     */
    schedule: (CourseTime & CourseLocation)[];
    /**
     * 學分學程
     */
    programs: string[];
    /**
     * 備註
     */
    comment: string;
    /**
     * 修課限制
     */
    restrict: string;

    /**
     * 精選課程？
     */
    featured: boolean;
}

export interface CourseLecturingMethodology {
    /**
     * 授課種類
     */
    type: string;

    note: string;
}

export interface CourseGradingPolicy {
    /**
     * 評分種類
     */
    type: string;

    /**
     * 評分比重 0 ~ 100
     */
    weight: number;

    note: string;
}

export interface CourseRating {
    /**
     * 甜度評分 Stars
     */
    gpa: number;

    /**
     * 涼度評分 Stars
     */
    easy: number;

    /**
     * 實用度評分 Stars
     */
    usefulness: number;
}

export interface CourseReview {
    /**
     * 評論內容
     */
    content: string;

    /**
     * 評論時間
     */
    time: string;

    /**
     * 評論者
     */
    user: string;

    /**
     * 量化評論
     */
    rating: CourseRating;
}

export interface CourseInfo extends CourseMeta {
    /**
     * 課程簡介
     */
    description: string;

    /**
     * 實際每週授課時數
     */
    hours: number;

    /**
     * 課程目標
     */
    goals: string[];

    /**
     * 教學大綱
     */
    syllabus: string;

    /**
     * 教學方法
     */
    methodologies: CourseLecturingMethodology[];

    /**
     * 評分方法
     */
    grading: CourseGradingPolicy[];

    /**
     * 先修課程
     */
    prerequisite: string;

    /**
     * 通識領域
     */
    general_core: string[];

    /**
     * 評分數據
     */
    rating: CourseRating;

    /**
     * 課程評論
     */
    reviews: CourseReview[];
}

export interface PostVote {
    up: number;
    down: number;
}

export interface PostRating {
    sweetness: number;
    easiness: number;
    usefulness: number;
}

export interface PostMeta {
    id: string;
    type: "review" | "question" | "others";
    author: string;
    title: string;
    time: string;
    vote: PostVote;
    tags: string[];
    course:
        | null
        | (Pick<CourseMeta, "year" | "term" | "serial" | "name"> & {
              teacher: string;
          });
}

export interface PostInfo extends PostMeta {
    content: string;
    course:
        | null
        | (Pick<CourseMeta, "year" | "term" | "serial" | "name"> & {
              teacher: string;
              rating: PostRating;
          });
}

export interface User {
    jwt: string;
    username: string;
    display: string;
    email: string;
}
