<template>
    <div class="w-screen sm:max-w-md mx-auto bg-white rounded py-10 px-4">
        <h1 class="text-3xl font-bold w-full text-center">Register</h1>
        <div class="mt-8">
            <form class="flex flex-col gap-4">
                <InputComponent label="Username" required />
                <InputComponent label="Email Address" required type="email" />
                <InputComponent label="Phone Number" required />
                <InputComponent type="password" label="Password" required />
                <InputComponent
                    type="password"
                    label="Confirm Password"
                    required
                />
                <div class="flex justify-between items-center mt-4">
                    <router-link to="login" class="text-blue-500"
                        >Login</router-link
                    >
                    <PrimaryButton>Register</PrimaryButton>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import InputComponent from "../components/InputComponent.vue";
import PrimaryButton from "../components/PrimaryButton.vue";
</script>
