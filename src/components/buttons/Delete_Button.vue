<template>
  <button class="btn btn-error" @click="props.deleteFunction" type="button">
    Delete!
  </button>
</template>
<script setup lang="ts">
type Props = {
    deleteFunction: () => void
    itToDel?: number
    confirm_pass?: string
}
const props = defineProps<Props>()
</script>
