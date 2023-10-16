<template>
  <table>
    <thead>
      <BasicTh :keys="keys" :excludeId="props.excludeId" />
      <slot name="th-slot"></slot>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index" class="">
        <BasicTd
          :data="filteredData[index]"
          :custom-td-component="tdLayout"
          v-model="modelValue"
          :edit="edit === index"
        />
        <slot name="td-slot" :id="item.id" :index="index" :value="item"></slot>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts" generic="T extends {id?:number}">
import BasicTh from "./BasicTh.vue";
import { computed, onMounted } from "vue";
import BasicTd from "./BasicTd.vue";

type Props = {
  data: T[];
  keys: string[];
  tdLayout?: any;
  edit?: number | null;
  excludeId?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  tdLayout: null,
  edit: null,
  excludeId: true,
});
const filteredData = computed(() => {
  const newData = props.data.map((x) => ({ ...x }));
  if (props.excludeId) {
    newData.forEach((someItems) => {
      delete someItems.id;
    });
  }
  return newData;
});

const modelValue = defineModel({});
onMounted(() => {
  modelValue.value = props.data;
});
</script>
