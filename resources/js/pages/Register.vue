<template>
    <div>
        <FormComponent title="Register" @submit="submit">
            <InputComponent
                label="Username"
                required
                v-model="input.username"
                :errors="errors"
                name="username"
            />
            <InputComponent
                label="Email Address"
                required
                type="email"
                v-model="input.email"
                :errors="errors"
                name="email"
            />
            <InputComponent
                label="Phone Number"
                required
                v-model="input.phone"
                :errors="errors"
                name="phone"
            />
            <InputComponent
                type="password"
                label="Password"
                required
                v-model="input.password"
                minlength="6"
                :errors="errors"
                name="password"
            />
            <InputComponent
                type="password"
                label="Confirm Password"
                required
                v-model="input.confirm_password"
                :errors="errors"
                name="confirm_password"
            />

            <div v-if="errors?.message" class="text-center w-full text-red-500">
                {{ errors.message }}
            </div>

            <template #actions>
                <router-link to="login" class="text-blue-500">
                    Login
                </router-link>
                <PrimaryButton>Register</PrimaryButton>
            </template>
        </FormComponent>
        <Loader v-show="loading" />
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";

import FormComponent from "../components/FormComponent.vue";
import InputComponent from "../components/InputComponent.vue";
import PrimaryButton from "../components/PrimaryButton.vue";
import Loader from "../components/Loader.vue";

const auth = useAuthStore();
const router = useRouter();

const errors = computed(() => {
    return auth.errors;
});

const loading = ref(false);

const input = ref({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
});

const submit = async () => {
    if (!loading.value && confirmPassword()) {
        loading.value = true;
        await auth.register(input.value);
        if (auth.isAuthenticated) {
            router.replace({ name: "welcome" });
        }
        loading.value = false;
    }
};

const confirmPassword = () => {
    if (input.value.password !== input.value.confirm_password) {
        auth.errors = { message: "Passwords do not match." };
        setTimeout(() => {
            auth.errors = null;
        }, 5000);
        return false;
    }
    return true;
};
</script>
