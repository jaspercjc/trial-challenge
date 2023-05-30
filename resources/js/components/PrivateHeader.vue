<template>
    <div>
        <div class="w-screen h-screen md:max-w-7xl px-2 mx-auto pt-10">
            <header class="md:flex justify-between">
                <h1 class="font-bold">Welcome, {{ me ? me.username : "" }}</h1>
                <div class="flex gap-4 mt-4 md:mt-0">
                    <RouterLink
                        :to="{ name: 'records' }"
                        v-if="me?.role == 'admin'"
                    >
                        <PrimaryButton class="w-full md:w-auto">
                            View Records
                        </PrimaryButton>
                    </RouterLink>
                    <PrimaryButton
                        class="w-full md:w-auto"
                        v-else
                        @click="unsubscribe()"
                    >
                        Unsubscribe
                    </PrimaryButton>
                    <PrimaryButton class="w-full md:w-auto" @click="logout()"
                        >Logout</PrimaryButton
                    >
                </div>
            </header>

            <slot></slot>
        </div>
        <Loader v-show="loading" />
    </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth.store";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import PrimaryButton from "../components/PrimaryButton.vue";
import Loader from "../components/Loader.vue";

const auth = useAuthStore();
const router = useRouter();

const loading = ref(false);
const me = computed(() => {
    return auth.user;
});

async function logout() {
    loading.value = true;
    await auth.logout();
    router.replace({ name: "login" });
    loading.value = false;
}

async function unsubscribe() {
    loading.value = true;
    await auth.unsubscribe();
    router.replace({ name: "login" });
    loading.value = false;
}
</script>
