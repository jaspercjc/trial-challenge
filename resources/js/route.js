import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "guestLayout",
            path: "",
            component: () => import("./templates/GuestTemplate.vue"),
            children: [
                {
                    path: "/login",
                    alias: "",
                    name: "login",
                    component: () => import("./pages/Login.vue"),
                },
                {
                    path: "/register",
                    name: "register",
                    component: () => import("./pages/Register.vue"),
                },
            ],
        },
    ],
});

export default router;
