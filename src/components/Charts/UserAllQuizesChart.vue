<template>
  <ModalWindow btnOpenText="Show Chart">
    <LineChart :chartData="chartData" :options="chartOptions" />
  </ModalWindow>
</template>

<script lang="ts" setup>
import { computed, defineComponent, onMounted, ref } from "vue";
import { DoughnutChart, LineChart } from "vue-chart-3";
import { Chart, ChartData, registerables, ChartOptions } from "chart.js";
import { getReqAxios } from "@/utils/functions";
import ModalWindow from "../ModalWindow.vue";

import { UserLastQuizStat } from "@/types";

type Props = {
  user_id: number;
  company_id: number;
};

Chart.register(...registerables);
const data = ref<UserLastQuizStat[]>([]);

const chartData = computed<ChartData<"line", number[], unknown>>(() => {
  const quizGroups = new Map<number, UserLastQuizStat[]>();
  data.value.forEach((item) => {
    const quizValue = item.quiz;
    if (quizGroups.has(quizValue)) {
      quizGroups.get(quizValue)!.push(item);
    } else {
      quizGroups.set(quizValue, [item]);
    }
  });
  const resultArrays = Array.from(quizGroups.values());

  return {
    labels: data.value.map((_item, index) => (index + 1).toString()),
    datasets: resultArrays.map((dataset, index) => ({
      data: dataset.map((value) => value.score),
      label: dataset[index].quiz_title,
      type: "line",
    })),
  };
});
const chartOptions = ref<ChartOptions>({
  plugins: {
    tooltip: {
      callbacks: {
        title: (items) => {
          if (items[0].dataset.data.length === 0) {
            return "No data available";
          } else {
            return items[0].label;
          }
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Attempt",
      },
    },
    y: {
      title: {
        display: true,
        text: "Score",
      },
    },
  },
});
const props = defineProps<Props>();

const fetchScoreData = async () => {
  const result = await getReqAxios<UserLastQuizStat[]>(
    `api/company/quiz_results/get_user_quiz_from_company/`,
    {
      params: {
        ...props,
      },
    }
  );
  data.value = result;
};

onMounted(() => {
  fetchScoreData();
});
</script>
