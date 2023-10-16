<template>
  <th v-for="(item, index) in filteredData" :key="index">{{ item }}</th>
</template>
<script setup lang="ts" generic="T">
import { computed } from "vue";

type Props = {
  keys: string[];
  excludeId: boolean;
};
const props = defineProps<Props>();
const filteredData = computed(() => {
  if (props.excludeId) {
    return props.keys.filter((key) => key !== "id");
  }
  return props.keys;
});
</script>
