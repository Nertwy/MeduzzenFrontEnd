<template>
  <NavBar />
  <template v-if="data">
    <BasicTableWrapper
      :data="data"
      :keys="keys"
      class="table table-zebra"
      :exclude-strings="excludedKeys"
    >
      <template #th-slot></template>
      <template #td-slot></template>
    </BasicTableWrapper>
  </template>
  <template v-else>
    <Spinner />
  </template>
  <BasicButton @click="downloadResults" class="btn-info"
    >Download Results</BasicButton
  >
  <NotificationWindow />
</template>
<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import BasicTableWrapper from "@/components/BasicTable/BasicTableWrapper.vue";
import Spinner from "@/components/Spinner.vue";
import BasicButton from "@/components/buttons/BasicButton.vue";
import { UserLastQuizStat } from "@/types";
import { exportCSVFile, fetchUserInfo, getReqAxios } from "@/utils/functions";
import { formatUpdatedAt } from "@/utils/helpers";
import { onMounted, ref } from "vue";
import NotificationWindow from "@/components/NotificationWindow.vue";
const keys = ["Quiz name", "Score", "Time taken", "Last attempt"];
const excludedKeys: (keyof UserLastQuizStat)[] = [
  "id",
  "quiz",
  "user",
  "company",
];
const data = ref<UserLastQuizStat[] | null>(null);
const fetchUserLastTestsTime = async () => {
  try {
    const result = await getReqAxios<UserLastQuizStat[]>(
      `api/company/quiz_results/get_quizzes_last_time/`
    );
    data.value = result;
  } catch (error) {
    console.error(error);
  }
};
const downloadResults = async () => {
  try {
    const user = await fetchUserInfo();
    await exportCSVFile({ user_id: user.id });
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  fetchUserLastTestsTime();
});
</script>
