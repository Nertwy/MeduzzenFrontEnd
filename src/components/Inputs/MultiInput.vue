<template>
  <component v-for="(key, index) in Object.keys(data)" :is="wrapperTag">
    <template v-if="!isDisabled(key)">
      <BaseInput
        v-model="modelValue[key]"
        :key="index"
        :type="typeof data[key] === 'boolean' ? 'checkbox' : ''"
        :class="typeof data[key] === 'boolean' ? 'checkbox' : ''"
        v-bind="attrs"
      />
    </template>
    <template v-else>
      {{ modelValue[key] }}
    </template>
  </component>
</template>
<script setup lang="ts" generic="T">
import { useAttrs } from "vue";
import BaseInput from "./BaseInput.vue";
const attrs = useAttrs();
const props = defineProps({
  data: {
    type: [Object],
    required: true,
  },
  wrapperTag: {
    type: [String],
    required: false,
  },
  disableInputsByKeys: {
    type: [Array<string>],
    default: [],
  },
});

const modelValue = defineModel<typeof props.data>({ default: {} });
const isDisabled = (key: string) => {
  return props.disableInputsByKeys.includes(key);
};
</script>
