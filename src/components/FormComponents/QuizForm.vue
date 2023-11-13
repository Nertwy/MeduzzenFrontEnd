<template>
  <form
    role="form"
    @submit.prevent="submitQuiz"
    class="flex flex-col justify-around gap-3 m-2"
  >
    <BaseInput
      v-model="quiz.title"
      required
      class="input input-accent w-1/2"
      placeholder="Write a quiz title"
    />

    <BaseInput
      v-model="quiz.description"
      required
      class="input input-accent w-1/2"
      placeholder="Write a quiz description"
    />

    <ul class="flex flex-col">
      <li
        v-for="(question, questionIndex) in quiz.questions"
        :key="question.id"
      >
        <div class="join">
          <BaseInput
            :placeholder="'Question №' + questionIndex"
            v-model="question.question"
            required
            class="join-item input input-accent"
          />
          <BasicButton
            type="button"
            class="btn btn-secondary join-item"
            @click="removeQuestion(questionIndex)"
          >
            Remove question
          </BasicButton>
        </div>

        <MultipleAnswerInput
          edit
          :data="{
            answers: question.answer,
            correct_answers: question.correct_answer,
          }"
          :emit-answers="
            (answers, correct_answers) =>
              onAnswersUpdate(answers, correct_answers, questionIndex)
          "
        ></MultipleAnswerInput>
      </li>
    </ul>
    <BasicButton
      type="button"
      class="btn btn-primary w-1/3 self-center"
      @click="addQuestion()"
    >
      Add question
    </BasicButton>
    <template v-if="!edit">
      <BasicButton type="submit" class="w-1/3 self-center"
        >Create Quiz</BasicButton
      >
    </template>
    <template v-else>
      <BasicButton type="button" class="w-1/3 self-center" @click="editQuiz"
        >Edit Quiz</BasicButton
      >
    </template>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "../Inputs/BaseInput.vue";
import BasicButton from "../buttons/BasicButton.vue";
import { Quiz } from "@/types";
import { postReqAxios, updateReqAxios } from "@/utils/functions";
import MultipleAnswerInput from "../Inputs/MultipleAnswerInput.vue";
type Props = {
  companyId: number | null;
  data?: Quiz;
  edit?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  companyId: null,
  edit: false,
});
const quizModel = ref<Quiz>({
  company: props.companyId,
  description: "",
  title: "",
  questions: [
    {
      question: "",
      answer: ["", ""],
      correct_answer: [""],
    },
    {
      question: "",
      answer: ["", ""],
      correct_answer: [""],
    },
  ],
});

const quiz = ref(props.data ?? quizModel.value);

const submitQuiz = () => {
  try {
    quizModel.value.company = props.companyId;
    postReqAxios(`api/company/quiz/`, { data: quizModel.value });
  } catch (error) {
    console.error(error);
  }
};

const addQuestion = () => {
  quiz.value.questions.push({
    id: quiz.value.questions.length + 1,
    question: "",
    answer: [""],
    correct_answer: [""],
  });
};

const removeQuestion = (index?: number) => {
  if (index !== undefined && index >= 0 && quiz.value.questions.length > 2) {
    quiz.value.questions.splice(index, 1);
  }
};

const editQuiz = () => {
  try {
    if (!quiz.value.id) return;
    updateReqAxios(`api/company/quiz/`, quiz.value.id, quiz.value);
  } catch (error) {
    console.error(error);
  }
};

const onAnswersUpdate = (
  answers: string[],
  correct_answers: string[],
  index: number
) => {
  quiz.value.questions[index].answer = answers;
  quiz.value.questions[index].correct_answer = correct_answers;
};
</script>
