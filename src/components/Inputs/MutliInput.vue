<template>
  <div v-for="(keys, index) in Object.keys(data)" :key="index">
    <BaseInput v-model="modelValue[keys]" />
  </div>
</template>
<script setup lang="ts" generic="T">
import { onMounted } from "vue";
import BaseInput from "./BaseInput.vue";

const props = defineProps({
  data: {
    type: [Object],
    default: {},
    required: true,
  },
  refValue: {
    type: [Object],
    required: false,
  },
});

const modelValue = defineModel<typeof props.data>({ default: {} });
onMounted(() => {
  
});
</script>
