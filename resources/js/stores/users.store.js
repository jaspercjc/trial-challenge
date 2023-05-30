import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("users", {
    state: () => ({
        users: [],
        errors: null,
    }),
    getters: {},
    actions: {
        async getAll() {
            return await axios
                .get("api/users")
                .then((response) => {
                    var responseData = response.data;
                    this.users = responseData.data;
                    return true;
                })
                .catch((error) => {
                    this.users = [];
                    if (!(error?.response?.status == 401)) {
                        this.errors = {
                            message:
                                "Unable to process your request. Please try again later.",
                        };
                    }
                    return false;
                });
        },

        unset() {
            this.users = [];
        },
    },
});
