<template>
  <div v-if="ToastInfo.isShowing" class="toast toast-end">
    <div v-if="ToastInfo.alertInfoType" class="alert alert-info">
      <span
        >{{ text
        }}<template v-if="ToastInfo.text"
          >&nbsp; {{ ToastInfo.text }}</template
        ></span
      >
    </div>
    <div v-else class="alert alert-success">
      <span>{{ text }}</span>
    </div>
  </div>
  <slot></slot>
</template>
<script setup lang="ts">
import { ref } from "vue";

type ToastInfo = {
  alertInfoType: boolean;
  isShowing: boolean;
  showTime: number;
  text: string | null;
};
const props = defineProps({
  showTime: {
    type: [Number],
    default: 5000,
    required: false,
  },
  alertInfoType: {
    type: [Boolean],
    default: true,
    required: false,
  },
  text: {
    type: [String],
    default: "",
    required: true,
  },
  isShowing: {
    type: [Boolean],
    default: false,
    required: true,
  },
});
const ToastInfo = ref<ToastInfo>({
  isShowing: props.isShowing,
  alertInfoType: props.alertInfoType,
  showTime: props.showTime,
  text: null,
});
const triggerToast = (infoType: boolean, text?: string) => {
  ToastInfo.value.isShowing = true;
  ToastInfo.value.alertInfoType = infoType;
  if (text) ToastInfo.value.text = text;

  setTimeout(() => {
    ToastInfo.value.isShowing = false;
    ToastInfo.value.text = null;
  }, ToastInfo.value.showTime);
};
defineExpose({
  triggerToast,
});
</script>
