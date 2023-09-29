<template>
    <input v-model="data" class="border-2 valid:border-green-600 invalid:border-red-600" :pattern="props.regex.source" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
type Props = {
    regex: RegExp

}
const props = defineProps<Props>()
const data = ref('')
const isValid = ref(false)
const validateInput = () => {
    isValid.value = props.regex.test(data.value)
}
</script>
<style lang="">
    
</style>