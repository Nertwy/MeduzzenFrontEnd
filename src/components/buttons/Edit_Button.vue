<template>
  <template v-if="!edit">
    <Basic_button class="btn-info" @click="editRow">Edit</Basic_button>
  </template>
  <template v-else>
    <div class="join">
      <Basic_button class="btn-primary join-item" @click="editSubmit">
        Submit
      </Basic_button>
      <Basic_button class="btn-secondary join-item" @click="editCancel">
        Cancel
      </Basic_button>
    </div>
  </template>
</template>
<script setup lang="ts">
import Basic_button from "./Basic_button.vue";

type Props = {
  edit: boolean;
  editFunctionSubmit: () => void;
};
const props = withDefaults(defineProps<Props>(), {
  edit: false,
});

const emit = defineEmits(["editCancel", "submitUser", "editClick"]);
const editRow = () => {
  emit("editClick");
};
const editCancel = () => {
  emit("editCancel", null);
};
const editSubmit = () => {
  props.editFunctionSubmit();
  emit("submitUser", null);
};
</script>