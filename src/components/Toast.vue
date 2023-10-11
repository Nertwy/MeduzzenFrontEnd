<template>
    <div v-if="isShowing" class="toast toast-end">
        <div v-if="alertInfoType" class="alert alert-info">
            <span>{{ text }}</span>
        </div>
        <div v-else class="alert alert-success">
            <span>{{ text }}</span>
        </div>
    </div>
</template>
<script setup lang='ts'>

defineProps({
    showTime: {
        type: [Number],
        default: 5000,
        required: false
    },
    alertInfoType: {
        type: [Boolean],
        default: true,
        required: false
    },
    text: {
        type: [String],
        default: "",
        required: true
    },
    isShowing: {
        type: [Boolean],
        default: false,
        required: true
    }
})

</script>
