<template>
    <div>
        <div class="w-screen h-screen md:max-w-7xl px-2 mx-auto pt-10">
            <header class="md:flex justify-between">
                <h1 class="font-bold">Welcome, {{ me ? me.username : "" }}</h1>
                <div class="flex gap-4 mt-4 md:mt-0">
                    <PrimaryButton
                        class="w-full md:w-auto"
                        @click="viewRecords = !viewRecords"
                        v-if="me?.role == 'admin'"
                    >
                        View Records
                    </PrimaryButton>
                    <PrimaryButton class="w-full md:w-auto" v-else>
                        Unsubscribe
                    </PrimaryButton>
                    <PrimaryButton class="w-full md:w-auto" @click="logout()"
                        >Logout</PrimaryButton
                    >
                </div>
            </header>

            <div class="mt-5 overflow-x-auto" v-if="viewRecords">
                <table
                    class="auto border-collapse border border-slate-500 w-full"
                    v-if="users"
                >
                    <thead>
                        <tr>
                            <th class="border border-slate-600 px-2">
                                Username
                            </th>
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
        </div>
        <Loader v-show="loading" />
    </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/users.store";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import PrimaryButton from "../components/PrimaryButton.vue";
import Loader from "../components/Loader.vue";

const auth = useAuthStore();
const userStore = useUserStore();
const router = useRouter();

const loading = ref(false);
const viewRecords = ref(false);
const me = computed(() => {
    return auth.user;
});

const users = computed(() => {
    return userStore.users;
});

const getUsers = async () => {
    if (me?.value?.role == "admin") {
        loading.value = true;
        await userStore.getAll();
        loading.value = false;
    }
};

async function logout() {
    loading.value = true;
    await auth.logout();
    router.replace({ name: "login" });
    loading.value = false;
}

onMounted(() => {
    getUsers();
});
</script>
