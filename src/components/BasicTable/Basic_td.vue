<template>
    <!-- <template v-for="data in data"> -->
    <template v-if="typeof data === 'boolean'">
        <BaseInputVue :model-value="data" :class="'checkbox'" type="checkbox" disabled :checked="data" />
    </template>
    <template v-else>
        <template v-if="tdLayout">
            <component :is="tdLayout" :data="componentPropsData" v-model="modelValue" :edit="edit"></component>
        </template>
        <template v-else>
            {{ data }}
        </template>
    </template>
    <!-- </template> -->
</template>
<script setup lang='ts' generic="T extends {}">
import BaseInputVue from '@/components/Inputs/BaseInput.vue';
import { DefineComponent, computed, onMounted, ref, watchEffect } from 'vue';
import Edit_Input from '../Inputs/Edit_Input.vue';
type Props = {
    data: T,
    tdLayout?: typeof Edit_Input,
    callback?: (id?: number) => void,
    edit: boolean
}
const props = withDefaults(defineProps<Props>(), {
    edit: false
})
const componentPropsData = ref<Record<string, T>>(props.data)
const modelValue = defineModel<Record<string, any>>({ default: {} })

onMounted(() => {
    componentPropsData.value = props.data
})
</script>
 