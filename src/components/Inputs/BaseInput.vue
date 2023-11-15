<template>
  <label v-if="label" role="note">{{ label }}</label>
  <input v-bind="attrs" @input="onInput" role="textbox" v-model="internalModelValue" />
</template>
<script setup lang="ts">
import { ref, useAttrs, watch } from "vue";

const attrs = useAttrs();

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  label: {
    type: [String, Boolean],
  },
  modelValue: {
    type: [String],
  },
});
const internalModelValue = ref(props.modelValue ?? "");

// Watch for changes in the modelValue prop and update the internalModelValue accordingly
watch(() => props.modelValue, (newValue) => {
  internalModelValue.value = newValue ?? "";
});
const onInput = (e: Event) => {
  const newValue = (e.target! as HTMLInputElement).value;
  internalModelValue.value = newValue;
  emit("update:modelValue", newValue);
};
</script>
