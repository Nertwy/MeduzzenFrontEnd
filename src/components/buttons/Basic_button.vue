<template>
  <button @click="(event) => onClickFunc(event)">{{ buttonText }}</button>
</template>
<script setup lang="ts">
defineProps({
  buttonText: {
    type: [String],
    required: true,
  },
  onClickFunc: {
    type: [Function],
    required: false,
    default: () => {},
  },
});
</script>
