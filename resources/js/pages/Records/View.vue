<template>
    <PrivateHeader>
        <div class="mt-5 overflow-x-auto">
            <table
                class="auto border-collapse border border-slate-500 w-full"
                v-if="users"
            >
                <thead>
                    <tr>
                        <th class="border border-slate-600 px-2">Username</th>
                        <th class="border border-slate-600 px-2">Email</th>
                        <th class="border border-slate-600 px-2">
                            Phone Number
                        </th>
                        <th class="border border-slate-600 px-2">Role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users">
                        <td class="border border-slate-700 px-2">
                            {{ user.username }}
                        </td>
                        <td class="border border-slate-700 px-2">
                            {{ user.email }}
                        </td>
                        <td class="border border-slate-700 px-2">
                            {{ user.phone }}
                        </td>
                        <td class="border border-slate-700 px-2">
                            {{ user.role }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Loader v-if="loading" />
    </PrivateHeader>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/users.store";
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";

import Loader from "@/components/Loader.vue";
import PrivateHeader from "@/components/PrivateHeader.vue";

const auth = useAuthStore();
const router = useRouter();
const userStore = useUserStore();

const loading = ref(false);
const users = computed(() => {
    return userStore.users;
});

const me = computed(() => {
    return auth.user;
});

const getUsers = async () => {
    if (me?.value?.role == "admin") {
        loading.value = true;
        await userStore.getAll();
        loading.value = false;
    } else {
        router.replace({ name: "welcome" });
    }
};

onMounted(() => {
    getUsers();
});
</script>
