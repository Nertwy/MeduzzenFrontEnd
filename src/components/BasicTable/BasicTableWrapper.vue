<template>
  <table>
    <thead>
      <BasicTh :keys="keys" :excludeId="props.excludeId" />
      <slot name="th-slot"></slot>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index" class="">
        <BasicTd
          @update:props-data="(newObj) => updateModelValue(item, newObj)"
          :data="filteredData[index]"
          :custom-td-component="tdLayout"
          :edit="edit === index"
        />
        <slot name="td-slot" :id="item?.id" :index="index" :value="item"></slot>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts" generic="T extends {id?:number}">
import BasicTh from "./BasicTh.vue";
import { computed} from "vue";
import BasicTd from "./BasicTd.vue";

type Props = {
  data: T[];
  keys: string[];
  tdLayout?: any;
  edit?: number | null;
  excludeStrings?: (keyof T)[];
};
const props = withDefaults(defineProps<Props>(), {
  tdLayout: null,
  edit: null,
  excludeId: true,
  excludeStrings: () => ["id"],
});
const filteredData = computed(() => {
  const newData = props.data.map((x) => ({ ...x }));

  if (props.excludeStrings) {
    props.excludeStrings.forEach((someStr) => {
      newData.forEach((someItems) => {
        delete someItems[someStr];
      });
    });
  }

  return newData;
});
const emit = defineEmits(["update:model-value"]);
const updateModelValue = (defaultValue: T, obj: Record<string, T>) => {
  const newValue: T = {
    ...defaultValue,
    ...obj,
  };
  emit("update:model-value", newValue);
};
</script>
