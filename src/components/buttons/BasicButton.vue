<template>
  <button class="btn" @click="emit('click')"><slot></slot></button>
</template>
<script setup lang="ts">
defineProps({
  buttonType: {
    type: [String],
    default: "button",
  },
});
const emit = defineEmits(["click"]);
</script>
