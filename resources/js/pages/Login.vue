<template>
    <div class="w-screen sm:max-w-md mx-auto bg-white rounded py-10 px-4">
        <h1 class="text-3xl font-bold w-full text-center">Login</h1>
        <div class="mt-8">
            <form class="flex flex-col gap-4">
                <InputComponent label="Email" required />
                <InputComponent type="password" label="Password" required />
                <div class="flex justify-between items-center mt-4">
                    <div class="text-blue-500">Register</div>
                    <PrimaryButton>Login</PrimaryButton>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import InputComponent from "../components/InputComponent.vue";
import PrimaryButton from "../components/PrimaryButton.vue";
</script>
