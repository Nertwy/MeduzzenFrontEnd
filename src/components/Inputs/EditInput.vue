<template>
  <template v-if="edit">
    <MutliInput
      @update:multi-value="(value) => updateMultiInputs(value)"
      :data="modelValue"
      :wrapper-tag="'td'"
      :disable-inputs-by-keys="['id', 'email']"
      :class="'input input-accent'"
    />
  </template>
  <template v-else>
    <template v-for="item in data">
      <td role="gridcell">
        <template v-if="typeof item === 'boolean'">
          <BaseInput
            :model-value="(item as unknown as string)"
            :class="'checkbox'"
            type="checkbox"
            disabled
            :checked="item"
          />
        </template>
        <template v-else>
          {{ item }}
        </template>
      </td>
    </template>
  </template>
</template>
<script setup lang="ts" generic="T">
import { onMounted, ref, withDefaults, defineProps, defineEmits } from "vue";
import BaseInput from "./BaseInput.vue";
import MutliInput from "./MultiInput.vue";
type Props = {
  data: Record<string, T>;
  edit?: boolean;
  style?: string;
};
const emit = defineEmits(["update:componentPropsData"]);
const keys = ref<string[]>([]);

const props = withDefaults(defineProps<Props>(), {
  edit: false,
  style: "input input-primary",
});
const modelValue = ref<Record<string, T>>(props.data);
onMounted(() => {
  keys.value = Object.keys(props.data);
});
const updateMultiInputs = (value: any) => {
  modelValue.value = value;
  emit("update:componentPropsData", modelValue.value);
};
</script>
