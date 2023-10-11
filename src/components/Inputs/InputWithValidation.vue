<template>
  <BaseInput
    :model-value="data"
    :pattern="regex.source"
    class="border-2 valid:input-success invalid:input-error"
  />
  <!-- <input v-model="data" class="input border-2 valid:input-success invalid:input-error" :pattern="props.regex.source" /> -->
</template>
<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "./BaseInput.vue";

defineProps({
  regex: {
    type: [RegExp],
    default: /''/,
    required: true,
  },
});
const data = ref("");
</script>
