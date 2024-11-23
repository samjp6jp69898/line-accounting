import { createRouter, createWebHistory } from "vue-router";
import config from "./config";
import HomePage from "./views/HomePage.vue";

const router = createRouter({
    mode: "history",
    history: createWebHistory(),
    routes: [
        //   { path: "/", component: HomePage, beforeEnter: homePageAuthGuard },
        { path: "/", name: 'Home', component: HomePage },
    ]
});

export default router;
