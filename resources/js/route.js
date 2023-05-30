import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";

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
        {
            path: "/welcome",
            name: "welcome",
            component: () => import("./pages/Welcome.vue"),
            meta: { authorize: true },
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    const publicPages = ["/", "/login", "/register"];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();
    if (!auth.isAuthenticated) {
        await auth.me();
    }

    if (!auth.isAuthenticated) {
        if (authRequired) {
            next({ name: "Login" });
        } else {
            next();
        }
    } else {
        if (!authRequired) {
            next({ name: "welcome" });
        } else {
            next();
        }
    }
});

export default router;
