<template>
  <template v-if="edit">
    <td v-for="(key, index) in dataKeys" :key="index">
      <input
        :class="style"
        v-model.trim="inputVal[key]"
        :type="getInputType(key, inputVal[key])"
        :disabled="key === 'id' || key === 'email'"
        @input="emit('input', key, inputVal[key])"
      />
    </td>
  </template>
  <template v-else>
    <td v-for="item in data">
      <div v-if="typeof item === 'boolean'">
        <BaseInputVue
          :model-value="item"
          :class="'checkbox'"
          type="checkbox"
          disabled
          :checked="item"
        />
      </div>
      <div v-else>{{ item }}</div>
    </td>
  </template>
</template>
<script setup lang="ts" generic="T extends Record<string,any>">
import { computed, ref } from "vue";
import BaseInputVue from "./Inputs/BaseInput.vue";

type Props = {
  edit: boolean;
  data: T;
};
const props = withDefaults(defineProps<Props>(), {
   edit: false
})
const style = ref("input text-white input-primary")
const emit = defineEmits(["input"])
const inputVal = ref<Record<string, any>>({ ...props.data })
const data = computed(() => Object.values(props.data))
const dataKeys = Object.keys(props.data as object)
const getInputType = (key: string, value: {}) => {
  console.log(key, value);

  switch (true) {
    case key.toLowerCase().includes("email"):
      return "email";
    case key.toLowerCase().includes("id"):
      return "number";
    case value === true || value === false:
      console.log("Yes");

      return "checkbox";
    default:
      return "text";
  }
};
</script>
