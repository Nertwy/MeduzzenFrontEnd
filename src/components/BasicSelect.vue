<template>
  <label v-if="label">{{ label }}</label>
  <select
    class="select select-bordered w-full max-w-xs"
    v-model="selectedId"
    @change="onSelect()"
  >
    <option disabled selected>{{ defaultText }}</option>
    <option
      v-if="isArray"
      v-for="(item, index) in data"
      :key="item.id"
      :value="item.id"
    >
      {{ item[keyToShow] }}
    </option>
    <option v-else>
      {{ data[keyToShow] }}
    </option>
  </select>
</template>
<script setup lang="ts" generic="T extends {id?:number,[key:string]:any}">
import { ref } from "vue";

type Props = {
  label?: string;
  data: any;
  keyToShow: string;
  defaultText?: string;
};
const props = defineProps<Props>();
const selectedId = ref<null | number>(null);
const emit = defineEmits(["select-change"]);
const isArray = ref(Array.isArray(props.data));
const onSelect = () => {
  emit("select-change", selectedId.value);
};
</script>
