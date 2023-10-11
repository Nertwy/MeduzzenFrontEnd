<template>
    <th v-for="(item, index) in keys" :key="index">{{ item }}</th>
</template>
<script setup lang='ts' generic="T">
type Props = {
    keys: string[]
}
defineProps<Props>()
</script>
