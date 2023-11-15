<template>
  <label v-if="label">{{ label }}</label>
  <input
    v-bind="attrs"
    type="checkbox"
    class="toggle"
    :checked="isChecked"
    @change="toggle"
  />
</template>
<script setup lang="ts">
import { useAttrs,ref } from "vue";

const attrs = useAttrs();
const emit = defineEmits(["change"]);
const isChecked = ref<boolean>(false);
defineProps({
  label: {
    type: [String],
  },
});
const toggle = () => {
  isChecked.value = !isChecked.value;
  emit("change", isChecked.value);
};
</script>
