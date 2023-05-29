<template>
    <div>
        <label v-if="label" class="font-bold text-sm mb-2 block">
            {{ label }}
        </label>
        <input
            :type="type"
            ref="input"
            class="w-full border-2 border-gray-300 focus:border-primary focus:ring-0 rounded-md px-2 py-1 text-lg"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            required
        />
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

defineProps({
    modelValue: String,
    required: Boolean,
    type: {
        String,
        default: "text",
    },
    label: {
        String,
        required: false,
    },
});

defineEmits(["update:modelValue"]);

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute("autofocus")) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
</script>
