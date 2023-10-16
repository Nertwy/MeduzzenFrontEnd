<template>
  <template v-if="!edit">
    <BasicButton class="btn-info" @click="editRow">Edit</BasicButton>
  </template>
  <template v-else>
    <div class="join">
      <BasicButton class="btn-primary join-item" @click="editSubmit">
        Submit
      </BasicButton>
      <BasicButton class="btn-secondary join-item" @click="editCancel">
        Cancel
      </BasicButton>
    </div>
  </template>
</template>
<script setup lang="ts">
import BasicButton from "./BasicButton.vue";

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
