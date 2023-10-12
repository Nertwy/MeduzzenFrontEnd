<template>
  <button class="btn btn-error" @click="props.deleteFunction" type="button">
    Delete!
  </button>
</template>
<script setup lang="ts">
type Props = {
  deleteFunction: () => void;
};
const props = defineProps<Props>();
</script>
<style lang="scss"></style>
