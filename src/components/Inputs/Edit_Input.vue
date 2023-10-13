<template>
  <template v-if="edit">
    <MutliInput
      :data="data"
      v-model="modelValue"
      :wrapper-tag="'td'"
      :disable-inputs-by-keys="['id', 'email']"
      :class="'input input-accent'"
    />
  </template>
  <template v-else>
    <template v-for="item in data">
      <td>
        <template v-if="typeof item === 'boolean'">
          <BaseInput
            :model-value="item"
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
import { onMounted, ref } from "vue";
import BaseInput from "./BaseInput.vue";
import MutliInput from "./MutliInput.vue";
type Props = {
  data: Record<string, T>;
  edit?: boolean;
  style?: string;
};
const keys = ref<string[]>([]);
const modelValue = defineModel<Record<string, T>>({
  required: true,
  local: true,
});
const props = withDefaults(defineProps<Props>(), {
  edit: false,
  style: "input input-primary",
});
onMounted(() => {
  modelValue.value = props.data;
  keys.value = Object.keys(props.data);
});
</script>
