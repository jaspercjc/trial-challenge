<template>
    <div class="w-screen sm:max-w-md mx-auto bg-white rounded py-10 px-4">
        <h1 class="text-3xl font-bold w-full text-center" v-if="title">
            {{ title }}
        </h1>
        <div class="mt-8">
            <form class="flex flex-col gap-4" @submit.prevent="$emit('submit')">
                <slot></slot>
                <div class="flex justify-between items-center mt-4">
                    <slot name="actions"></slot>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        String,
        required: false,
    },
});

defineEmits(["submit"]);
</script>
