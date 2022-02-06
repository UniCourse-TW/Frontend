// #region General Type Definitions
export interface ResponseError {
    title: string;
    message: string;
}

export interface Response {
    /** if the action was successful */
    success: boolean;

    /** if success is true, then data should be defined, otherwise it should be undefined */
    data?: unknown;

    /** if success is false, then err should be defined, otherwise it should be undefined */
    err?: ResponseError;

    /** new jwt */
    token?: string;
}
// #endregion

// #region Course API Type Definitions

// #region type CourseListFilter
/** 
department (d) 系所 `d:資工`
teacher (T) 教師 `T:紀`
title (t) 課程名稱 `t:程式設計`
code (c) 科目代碼 `c:CSU0002`
serial (s) 開課序號 `s:2949`
year (y) 開課學年度 `y:110`（或者要合併學期 110-2 或 1102）
term (tm) 開課學期 `tm:2`
tag (tg) 標籤 `tg:UX`
program (p) 學分學程 `p:音樂科技`
general (g) 通識領域 `g:人文`
rating (r) 綜合評分 `r:>4.5` （> < =）
usefulness (uf) 實用性 `u:>4`
sweetness (sw) 甜度 `s:>4`
easiness (es) 涼度 `e:>4`
day (d) 週幾授課 `d:1` (考慮與節數時段合併？)
session (sn) 包含的節數時段 `sn:1-2` `sn:5`
location (l) 地點 `l:公館`
quota (q) 名額 `q:>10`
grading (gd) 評分方法 `gd:作業>49`
hours (h) 實際每週授課時數 `h:<3`
methodology (m) 教學方法包含 `m:講述法`
prerequisite (pr) 先修課程 `pr:程式設計（一）`
*/
export type CourseListFilter =
    | "default"
    | "department"
    | "teacher"
    | "title"
    | "code"
    | "serial"
    | "year"
    | "term"
    | "tag"
    | "program"
    | "general"
    | "rating"
    | "usefulness"
    | "sweetness"
    | "easiness"
    | "day"
    | "session"
    | "location"
    | "quota"
    | "grading"
    | "hours"
    | "methodology"
    | "prerequisite";
// #endregion

export interface CourseListQuery {
    q: string;
    limit: number;
    offset: number;
    sort: CourseListFilter;
    desc: boolean;
}

// #endregion

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

export interface CourseTag {
    name: string;
    weight: number;
    color: string;
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

    /**
     * 標籤
     */
    tags: CourseTag[];
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

export interface User {
    jwt: string;
    username: string;
    display: string;
    email: string;
}
