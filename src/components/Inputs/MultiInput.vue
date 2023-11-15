<template>
  <component v-for="(key, index) in keys" :is="wrapperTag" role="list">
    <template v-if="!isDisabled(key)">
      <BaseInput
        :modelValue="(MultiInputValue[key] as string)"
        @update:modelValue="(e) => onMultiInput(e, key)"
        :key="index"
        :type="typeof data[key] === 'boolean' ? 'checkbox' : ''"
        :class="typeof data[key] === 'boolean' ? 'checkbox' : ''"
        v-bind="attrs"
      />
    </template>
    <template v-else>
      {{ MultiInputValue[key] }}
    </template>
  </component>
</template>
<script setup lang="ts" generic="T">
import { useAttrs } from "vue";
import BaseInput from "./BaseInput.vue";
import { computed, ref } from "vue";
const attrs = useAttrs();
const emit = defineEmits(["update:multiValue"]);

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

const MultiInputValue = computed<Record<string, T>>(() => props.data);
const keys = computed(() => Object.keys(props.data));
const isDisabled = (key: string) => {
  return props.disableInputsByKeys.includes(key);
};

const onMultiInput = (value: T, key: string) => {
  MultiInputValue.value[key] = value;
  emit("update:multiValue", MultiInputValue.value);
};
</script>
