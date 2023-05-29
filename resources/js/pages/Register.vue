<template>
    <FormComponent title="Register">
        <InputComponent label="Username" required />
        <InputComponent label="Email Address" required type="email" />
        <InputComponent label="Phone Number" required />
        <InputComponent type="password" label="Password" required />
        <InputComponent type="password" label="Confirm Password" required />

        <template #actions>
            <router-link to="login" class="text-blue-500"> Login </router-link>
            <PrimaryButton>Register</PrimaryButton>
        </template>
    </FormComponent>
</template>

<script setup>
import FormComponent from "../components/FormComponent.vue";
import InputComponent from "../components/InputComponent.vue";
import PrimaryButton from "../components/PrimaryButton.vue";
</script>
