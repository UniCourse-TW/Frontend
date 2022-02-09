import { createRouter, createWebHistory } from "vue-router";
import routes from "pages-generated";

const router = createRouter({
    routes,
    history: createWebHistory(),
});

router.afterEach(() => {
    setTimeout(() => window.scrollTo({ top: 0 }), 350);
});

export default router;
