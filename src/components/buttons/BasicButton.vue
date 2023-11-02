<template>
  <button class="btn" @click="emit('click')">
    <slot></slot>
  </button>
</template>
<script setup lang="ts">

const emit = defineEmits(["click"]);
</script>
