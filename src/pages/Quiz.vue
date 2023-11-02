<template>
  <form>
    <BasicButton type="submit" в></BasicButton>
  </form>
</template>
<script setup lang="ts">
import BasicButton from "@/components/buttons/BasicButton.vue";
import { Quiz } from "@/types";
import { getReqAxios, postReqAxios } from "@/utils/functions";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const quiz = ref<Quiz>();
const startQuiz = async () => {
  try {
    const quizId = router.currentRoute.value.params.id;
    const fetchedQuiz = await getReqAxios<Quiz>(`api/company/quiz/${quizId}/`);
    quiz.value = fetchedQuiz;
    const result = await postReqAxios(`api/company/quiz/${quizId}/start_quiz/`);
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  startQuiz();
});
</script>
