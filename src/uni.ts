import { UniCourse } from "unicourse";

const cached = localStorage.getItem("unicourse") || undefined;
export const uni = new UniCourse(cached, {
    server: "https://api.unicourse.tw",
});

((login: typeof uni.login) => {
    uni.login = async (username: string, password: string) => {
        const result = await login(username, password);
        if (uni.raw_token) {
            localStorage.setItem("unicourse", uni.raw_token);
        }
        return result;
    };
})(uni.login.bind(uni));

export default uni;
