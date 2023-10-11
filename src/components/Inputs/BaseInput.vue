<template>
    <label v-if="label">{{ label }}</label>
    <input v-bind="attrs" v-model="modelValue" :checked="modelValue">
</template>
<script setup lang='ts'>

import { defineModel, useAttrs } from 'vue';
const modelValue = defineModel({ default: "" })
const attrs = useAttrs()
defineProps({
    label: {
        type: [String, Boolean],
    },
    modelValue: {
        type: [String, Boolean],
        default: ""
    },
    validation: {
        type: [RegExp],
        default: /""/
    }
})

</script>