<template>
  <template v-if="editIndex !== index">
    <button
      class="btn btn-info"
      @click="editRow"
      :disabled="isEditButtonDisabled"
    >
      Edit
    </button>
  </template>
  <template v-else>
    <div class="join">
      <button class="btn btn-primary join-item" @click="editSubmit">
        Submit
      </button>
      <button class="btn btn-secondary join-item" @click="editCancel">
        Cancel
      </button>
    </div>
  </template>
</template>
<script setup lang="ts">
type Props = {
  index: number;
  editIndex: number | null;
  editFunctionSubmit: () => void;
};
const props = withDefaults(defineProps<Props>(), {
  editIndex: null,
});
const isEditButtonDisabled =
  props.editIndex !== null && props.editIndex !== props.index;
const emit = defineEmits(["editUser", "submitUser"]);
const editRow = () => {
  emit("editUser", props.index);
};
const editCancel = () => {
  emit("editUser", null);
};
const editSubmit = () => {
  props.editFunctionSubmit();
  emit("editUser", null);
};
</script>

<style lang="scss"></style>
