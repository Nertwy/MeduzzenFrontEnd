<template>
  <template v-if="customTdComponent">
    <component
      :is="customTdComponent"
      :data="componentPropsData"
      v-model="modelValue"
      :edit="edit"
    ></component>
  </template>
  <template v-else>
    <template v-for="item in data">
      <template v-if="typeof item === 'boolean'">
        <BaseInputVue
          :model-value="item"
          :class="'checkbox'"
          type="checkbox"
          disabled
          :checked="item"
        />
      </template>
      <td v-else>{{ item }}</td>
    </template>
  </template>
</template>
<script setup lang="ts" generic="T extends {}">
import BaseInputVue from "@/components/Inputs/BaseInput.vue";
import {  onMounted, ref } from "vue";
import Edit_Input from "../Inputs/EditInput.vue";
type Props = {
  data: T;
  customTdComponent?: typeof Edit_Input;
  callback?: (id?: number) => void;
  edit: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  edit: false,
});
const componentPropsData = ref<Record<string, T>>(props.data);
const modelValue = defineModel<Record<string, T>>({ default: {} });

onMounted(() => {
  componentPropsData.value = props.data;
});
</script>
