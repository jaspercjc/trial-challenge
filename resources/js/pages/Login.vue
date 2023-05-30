<template>
    <div>
        <FormComponent title="Login" @submit="submit">
            <InputComponent
                label="Username/Email"
                v-model="input.email"
                autofocus
                required
            />
            <InputComponent
                type="password"
                v-model="input.password"
                label="Password"
                required
            />

            <div v-if="message" class="text-center w-full text-red-500">
                {{ message.message }}
            </div>

            <template #actions>
                <RouterLink to="register" class="text-blue-500">
                    Register
                </RouterLink>
                <PrimaryButton>Login</PrimaryButton>
            </template>
        </FormComponent>
        <Loader v-show="loading" />
    </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

import FormComponent from "../components/FormComponent.vue";
import InputComponent from "../components/InputComponent.vue";
import PrimaryButton from "../components/PrimaryButton.vue";
import Loader from "../components/Loader.vue";

const input = ref({
    email: "",
    password: "",
});

const auth = useAuthStore();
const router = useRouter();
const message = computed(() => {
    return auth.errors;
});

const loading = ref(false);

const submit = async () => {
    if (!loading.value) {
        loading.value = true;
        await auth.login(input.value);

        if (auth.isAuthenticated) {
            router.replace({ name: "welcome" });
        } else if (message) {
            setTimeout(() => {
                auth.errors = null;
            }, 5000);
        }
        loading.value = false;
    }
};
</script>
