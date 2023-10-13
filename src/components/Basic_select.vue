<template>
  <label v-if="label">{{ label }}</label>
  <select class="select select-bordered w-full max-w-xs">
    <option disabled selected>{{ defaultText }}</option>
    <option v-if="isArray" v-for="(item, index) in data" :key="index">
      {{ item[keyToShow] }}
    </option>
    <option v-else>
        {{ data[keyToShow] }}
    </option>
  </select>
</template>
<script setup lang="ts" generic="T">
import { ref } from "vue";

type Props = {
  label?: string;
  data: Record<string, any>;
  keyToShow: string;
  defaultText?: string;
};
const props = defineProps<Props>();

const isArray = ref(Array.isArray(props.data));
</script>
