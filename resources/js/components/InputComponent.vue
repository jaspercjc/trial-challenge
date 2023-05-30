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
            :minlength="minlength"
        />
        <div v-if="errors && name && errors[name]" class="text-sm text-red-500">
            {{ errors[name][0] }}
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
    modelValue: String,
    required: Boolean,
    autofocus: Boolean,
    name: {
        type: String,
        required: false,
    },
    minlength: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        default: "text",
    },
    label: {
        type: String,
        required: false,
    },
    errors: {
        type: Object,
        required: false,
    },
});

defineEmits(["update:modelValue"]);

const input = ref(null);

onMounted(() => {
    if (props.autofocus) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
</script>
