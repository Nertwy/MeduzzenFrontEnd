<template>
    <BaseInput :model-value="values" />
</template>
<script setup lang='ts' generic="T extends {}">
import { onMounted, ref } from 'vue';
import BaseInput from './BaseInput.vue';
type Props = {
    data: T,
    edit: boolean
    style?: string
}
const values = defineModel<Record<string, T>>()
</script>