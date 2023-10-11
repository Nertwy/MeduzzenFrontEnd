<template>
    <template v-if="!edit">
        <button class="btn btn-info" @click="editRow">Edit</button>
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
<script setup lang='ts'>

type Props = {
    edit: boolean,
    editFunctionSubmit: () => void
}
const props = withDefaults(defineProps<Props>(), {
    edit: false
})

const emit = defineEmits(["editCancel", "submitUser", "editClick"])
const editRow = () => {
    emit("editClick")
}
const editCancel = () => {
    emit("editCancel", null)
}
const editSubmit = () => {
    props.editFunctionSubmit()
    emit("submitUser", null)

}
</script>
