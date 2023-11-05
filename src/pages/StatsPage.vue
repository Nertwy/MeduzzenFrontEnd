<template>
  <template v-if="data">
    <BasicTableWrapper
      :data="data"
      :keys="['Quiz name', 'Score', 'Time taken', 'Last attempt']"
      class="table table-zebra"
      :exclude-strings="['id', 'quiz', 'user', 'company']"
    >
      <template #th-slot></template>
      <template #td-slot></template>
    </BasicTableWrapper>
  </template>
  <template v-else>
    <Spinner />
  </template>
</template>
<script setup lang="ts">
import BasicTableWrapper from "@/components/BasicTable/BasicTableWrapper.vue";
import Spinner from "@/components/Spinner.vue";
import { UserLastQuizStat } from "@/types";
import { getReqAxios } from "@/utils/functions";
import { formatUpdatedAt } from "@/utils/helpers";
import { onMounted, ref } from "vue";
const data = ref<UserLastQuizStat[] | null>(null);
const fetchUserLastTestsTime = async () => {
  try {
    const result = await getReqAxios<UserLastQuizStat[]>(
      `api/company/quiz_results/get_quizzes_last_time/`
    );
    const formattedResult = result.map(formatUpdatedAt);
    data.value = result;
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  fetchUserLastTestsTime();
});
</script>
