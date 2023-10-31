<template>
  <input type="checkbox" class="toggle" :checked="isChecked" @change="toggle" />
</template>
<script setup lang="ts">
const emit = defineEmits(["change"]);
const isChecked = defineModel({ default: false });
const toggle = () => {
  isChecked.value = !isChecked.value;
  emit("change", isChecked.value);
};
</script>
