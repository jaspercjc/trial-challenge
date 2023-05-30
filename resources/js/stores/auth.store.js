import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        isAuthenticated: false,
        user: null,
        errors: null,
    }),

    getters: {},

    actions: {
        async login(credentials) {
            await axios
                .get("/sanctum/csrf-cookie")
                .then(() => {})
                .catch(() => {});
            await axios
                .post("/api/auth/authenticate", credentials)
                .then(() => {
                    this.errors = null;
                    return this.me();
                })
                .catch((error) => {
                    this.isAuthenticated = false;
                    this.user = null;
                    if (error?.response?.status == 422) {
                        this.errors = error.response.data;
                    } else {
                        this.errors = {
                            message:
                                "Unable to process your request. Please try again later.",
                        };
                    }
                });
        },

        async me() {
            return await axios
                .get("api/auth/user")
                .then((response) => {
                    this.user = response.data.data;
                    this.isAuthenticated = this.user.id ? true : false;
                    this.errors = null;
                })
                .catch(() => {
                    this.unset();
                });
        },

        unset() {
            this.isAuthenticated = false;
            this.user = null;
            this.errors = null;
        },
    },
});
