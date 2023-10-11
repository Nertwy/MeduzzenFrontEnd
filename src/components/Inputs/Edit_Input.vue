<template>
    <template v-if="edit">
        <td v-for="(key, index) in  keys" :key="index">
            <BaseInput :class="style" :disabled="key === 'id' || key === 'email'" v-model="modelValue[key]"
                :type="(typeof data[key] === 'boolean' ? 'checkbox' : '')" />
        </td>
    </template>
    <template v-else>
        <template v-for="item  in  data">
            <td>
                <template v-if="typeof item === 'boolean'">
                    <BaseInput :model-value="item" :class="'checkbox'" type="checkbox" disabled :checked="item" />
                </template>
                <template v-else>
                    {{ item }}
                </template>
            </td>
        </template>
    </template>
</template>
<script setup lang='ts' generic="T">
import { onMounted, ref } from 'vue';
import BaseInput from './BaseInput.vue';
type Props = {
    data: Record<string, any>,
    edit?: boolean
    style?: string
}
const keys = ref<string[]>([])
const modelValue = defineModel<Record<string, typeof props.data>>({ required: true, local: true })
const props = withDefaults(defineProps<Props>(), {
    edit: false,
    style: "input input-primary"
})
onMounted(() => {

    modelValue.value = props.data
    if (modelValue.value)
        keys.value = Object.keys(modelValue.value)

})
</script>