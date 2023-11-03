<template>
  <template v-if="fetchError || !quiz">{{ fetchError }}</template>
  <form v-else @submit.prevent="submitQuiz">
    <section v-for="(question, index) in quiz.questions" :key="index">
      <Card>
        <template #slot-title>
          <h1>Question №{{ index + 1 }}</h1>
          <h2>{{ question.question }}</h2>
        </template>
        <template #slot-actions>
          <MultipleAnswerInput
            :emit-answers="
              (answer, correct_answer) =>
                getAnswers(answer, correct_answer, index)
            "
            :data="{
              answers: question.answer,
              correct_answers: [],
            }"
          />
        </template>
      </Card>
    </section>
    <BasicButton type="submit">Submit Quiz</BasicButton>
  </form>
</template>
<script setup lang="ts">
import Card from "@/components/Card.vue";
import BaseInput from "@/components/Inputs/BaseInput.vue";
import MultipleAnswerInput from "@/components/Inputs/MultipleAnswerInput.vue";
import BasicButton from "@/components/buttons/BasicButton.vue";
import { Question, Quiz } from "@/types";
import { getReqAxios, postReqAxios } from "@/utils/functions";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const quiz = ref<Quiz | null>(null);
const fetchError = ref<null | unknown>(null);
const user_answers = ref<string[][]>([[]]);
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

const getAnswers = (
  _answer: string[],
  correct_answer: string[],
  index: number
) => {
  user_answers.value[index] = correct_answer;
  console.log(user_answers.value);
};
const submitQuiz = async () => {
  try {
    const quizId = router.currentRoute.value.params.id;
    await postReqAxios(`api/company/quiz/${quizId}/submit_quiz/`, {
      data: {
        user_answers: user_answers.value,
      },
    });
    router.push({ name: "Company_profile", params: { id: quizId } });
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  startQuiz();
});
</script>
