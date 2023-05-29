<template>
    <FormComponent title="Login">
        <InputComponent label="Username/Email" autofocus required />
        <InputComponent type="password" label="Password" required />
        <template #actions>
            <RouterLink to="register" class="text-blue-500">
                Register
            </RouterLink>
            <PrimaryButton>Login</PrimaryButton>
        </template>
    </FormComponent>
</template>

<script setup>
import FormComponent from "../components/FormComponent.vue";
import InputComponent from "../components/InputComponent.vue";
import PrimaryButton from "../components/PrimaryButton.vue";
</script>
