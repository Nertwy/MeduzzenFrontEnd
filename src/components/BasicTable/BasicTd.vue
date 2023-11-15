<template>
  <template v-if="customTdComponent">
    <component
      @update:component-props-data="updatePropsData"
      :is="customTdComponent"
      :data="componentPropsData"
      :edit="edit"
    ></component>
  </template>
  <template v-else>
    <template v-for="item in data">
      <template v-if="typeof item === 'boolean'">
        <BaseInputVue
          role="textbox"
          :model-value="(item as unknown as string)"
          :class="'checkbox'"
          type="checkbox"
          disabled
          :checked="item"
        />
      </template>
      <td v-else role="row">{{ item }}</td>
    </template>
  </template>
</template>
<script setup lang="ts" generic="T">
import BaseInputVue from "@/components/Inputs/BaseInput.vue";
import { ref } from "vue";
import Edit_Input from "../Inputs/EditInput.vue";
import { computed } from "vue";
type Props = {
  data: T;
  customTdComponent?: typeof Edit_Input;
  callback?: (id?: number) => void;
  edit: boolean;
};
const emit = defineEmits(["update:props-data"]);
const props = withDefaults(defineProps<Props>(), {
  edit: false,
});
const componentPropsData = ref<Record<string, T>>(
  props.data as Record<string, T>
);
const updatePropsData = (obj: Record<string, T>) => {
  componentPropsData.value = obj;
  emit("update:props-data", obj);
};
</script>
