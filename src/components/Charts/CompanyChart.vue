<template>
  <ModalWindow btnOpenText="Show Chart">
    <DoughnutChart :chartData="chartData" />
  </ModalWindow>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { DoughnutChart } from "vue-chart-3";
import { Chart, ChartData, registerables } from "chart.js";
import { getReqAxios } from "@/utils/functions";
import ModalWindow from "../ModalWindow.vue";

Chart.register(...registerables);
const data = ref<{ quiz_avg_scores: Array<any> }>({ quiz_avg_scores: [] });
const chartData = computed<ChartData<"doughnut", number[], unknown>>(() => ({
  labels: data.value.quiz_avg_scores.map(({ quiz__title }) => quiz__title),
  datasets: [
    { data: data.value.quiz_avg_scores.map((item) => item.average_score) },
  ],
}));
const fetchScoreData = async () => {
  const result = await getReqAxios<{ quiz_avg_scores: Array<any> }>(
    "api/scores/quiz_average_scores/"
  );
  data.value = result;
};

onMounted(() => {
  fetchScoreData();
});
</script>
