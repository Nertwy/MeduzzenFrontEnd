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
type QuizAverageScoresData = {
  quiz__title: string;
  average_score: number;
};
type QuizAverageScores = {
  quiz_avg_scores: QuizAverageScoresData[];
};
Chart.register(...registerables);
const data = ref<QuizAverageScores>({ quiz_avg_scores: [] });
const chartData = computed<ChartData<"doughnut", number[], unknown>>(() => ({
  labels: data.value.quiz_avg_scores.map(({ quiz__title }) => quiz__title),
  datasets: [
    {
      data: data.value.quiz_avg_scores.map(
        ({ average_score }) => average_score
      ),
    },
  ],
}));
const fetchScoreData = async () => {
  const result = await getReqAxios<QuizAverageScores>(
    "api/scores/quiz_average_scores/"
  );
  data.value = result;
};

onMounted(() => {
  fetchScoreData();
});
</script>