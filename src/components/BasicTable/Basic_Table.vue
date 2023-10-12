<template>
  <table>
    <thead>
      <Basic_th :keys="keys" />
      <slot name="th-slot"></slot>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index" class="">
        <Basic_td
          :data="item"
          :td-layout="tdLayout"
          v-model="modelValue"
          :edit="edit === item.id"
        />
        <slot name="td-slot" :id="item.id" :index="index" :value="item"></slot>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts" generic="T extends{id?:number}">
import Basic_th from "./Basic_th.vue";
import Basic_td from "./Basic_td.vue";
import { onMounted } from "vue";

type Props = {
  data: T[];
  keys: string[];
  tdLayout?: any;
  edit?: number | null;
};
const props = withDefaults(defineProps<Props>(), {
  tdLayout: null,
  edit: null,
});

const modelValue = defineModel();
onMounted(() => {
  modelValue.value = props.data;
});
</script>
