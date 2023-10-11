<template>
  <template v-if="edit">
    <td v-for="(key, index) in dataKeys" :key="index">
      <input
        class="input text-white input-primary"
        v-model.trim="inputVal[key]"
        :type="getInputType(key)"
        :disabled="key === 'id' || key === 'email'"
        @input="emit('input', key, inputVal[key])"
      />
    </td>
  </template>
  <template v-else>
    <td v-for="(item, index) in user" :key="index">
      {{ item }}
    </td>
  </template>
</template>
<script setup lang="ts" generic="T extends Record<string,any>">
import { computed, ref } from "vue";

type Props = {
  edit: boolean;
  data: T;
};
const props = withDefaults(defineProps<Props>(), {
  edit: false,
});
const emit = defineEmits(["input"]);
const inputVal = ref<Record<string, any>>({ ...props.data });
const user = computed(() => Object.values(props.data));
const dataKeys = Object.keys(props.data as object);
const getInputType = (key: string) => {
  if (key.toLowerCase().includes("email")) {
    return "email";
  } else if (key.toLowerCase().includes("id")) {
    return "number";
  } else {
    return "text";
  }
};
</script>
