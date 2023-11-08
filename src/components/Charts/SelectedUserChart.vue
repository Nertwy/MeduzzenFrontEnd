<template>
  <ModalWindow btnOpenText="Show Chart">
      <LineChart :chartData="chartData" />
  </ModalWindow>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { LineChart } from "vue-chart-3";
import { Chart, ChartData, registerables } from "chart.js";
import { getReqAxios } from "@/utils/functions";
import ModalWindow from "../ModalWindow.vue";

type Props = {
  user_id: number;
};
Chart.register(...registerables);
const data = ref<{ user_avg_scores: Array<any> }>({ user_avg_scores: [] });
const chartData = computed<ChartData<"line", number[], unknown>>(() => ({
  labels: data.value.user_avg_scores.map(({ month }) => month),
  datasets: [
    {
      data: data.value.user_avg_scores.map(
        ({ average_score }) => average_score
      ),
      label: "User scores",
    },
  ],
}));
const props = defineProps<Props>();
const fetchScoreData = async () => {
  const result = await getReqAxios<{ user_avg_scores: Array<any> }>(
    `api/scores/user/${props.user_id}/`
  );
  data.value = result;
};

onMounted(() => {
  fetchScoreData();
});
</script>
