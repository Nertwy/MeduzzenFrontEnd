<template>
    <div class="pagination">
        <button @click="changePage(-1)" :disabled="currentPage === 1">Previous</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="changePage(1)" :disabled="currentPage === totalPages">Next</button>
    </div>
</template>
<script setup lang='ts'>
import { defineEmits, withDefaults } from 'vue';
type Props = {
    currentPage: number
    totalPages: number
}
const props = withDefaults(defineProps<Props>(), {
    currentPage: 1,
    totalPages: 0
})

const emit = defineEmits();

const changePage = (delta: number) => {
    const newPage = props.currentPage + delta;
    if (newPage >= 1 && newPage <= props.totalPages) {
        emit('page-change', newPage);
    }
};
</script>
<style lang='scss'></style>