<template>
    <BaseInput :model-value="data" :pattern="regex.source" class="border-2 valid:input-success invalid:input-error" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from '@/components/Inputs/BaseInput.vue';

defineProps({
    regex: {
        type: [RegExp],
        default: /''/,
        required: true
    },
})
const data = ref('')

</script>