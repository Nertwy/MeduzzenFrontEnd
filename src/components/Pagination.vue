<template>
  <div>
    <ul class="join">
      <li class="join-item btn" @click="goToPage(1)">
        <a href="#">First</a>
      </li>
      <li class="join-item btn" @click="goToPage(currentPage - 1)">
        <a href="#">Previous</a>
      </li>
      <li class="join-item btn" @click="goToPage(currentPage + 1)">
        <a href="#">Next</a>
      </li>
      <li class="join-item btn" @click="goToPage(totalPages)">
        <a href="#">Last</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts" generic="T">
import { PageWith } from "@/types";
import { ref, computed, PropType, onMounted, onBeforeMount, watch } from "vue";

type Props = {
  itemsPerPage: number;
  paginationData: PageWith<T>;
  totalPages: number;
};

const props = defineProps<Props>();
const emit = defineEmits(["page-change"]);
const currentPage = ref<number>(1);
const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    currentPage.value = page;
    emit("page-change", page);
  }
};
</script>
