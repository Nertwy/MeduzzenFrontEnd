<template>
    <div>
        <!-- Display paginated items -->
        <ul class="join">
            <li :class="{ disabled: !hasPrevious }" class="join-item btn" @click="goToPage(1)">
                <a href="#">First</a>
            </li>
            <li :class="{ disabled: !hasPrevious }" class="join-item btn" @click="goToPage(currentPage - 1)">
                <a href="#">Previous</a>
            </li>
            <li :class="{ disabled: !hasNext }" class="join-item btn" @click="goToPage(currentPage + 1)">
                <a href="#">Next</a>
            </li>
            <li :class="{ disabled: !hasNext }" class="join-item btn" @click="goToPage(totalPages)">
                <a href="#">Last</a>
            </li>
        </ul>
    </div>
</template>
  
<script setup lang="ts" generic="T">
import { PageWith } from '@/types';
import { ref, computed, PropType } from 'vue';

type Props = {
    itemsPerPage: number,
    paginationData: PageWith<T>
};

const props = withDefaults(defineProps<Props>(), {
    itemsPerPage: 5
});
const emit = defineEmits(['page-change'])
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(props.paginationData!.count / props.itemsPerPage));
const hasPrevious = computed(() => props.paginationData!.previous !== null);
const hasNext = computed(() => props.paginationData!.next !== null);

const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        // Emit the page-change event with the selected page number
        emit('page-change', page);
    }
};
</script>
  