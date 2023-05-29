<template>
    <button
        :type="type"
        class="py-3 px-4 bg-primary text-primary-font font-semibold uppercase tracking-widest text-xs rounded-md hover:bg-opacity-80 disabled:opacity-25 transition"
    >
        <slot />
    </button>
</template>

<script setup>
const props = defineProps({
    type: { required: false, type: String },
});
</script>
