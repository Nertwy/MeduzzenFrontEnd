<template>
  <ul role="list">
    <li
      role="listitem"
      class="join join-vertical my-2 ml-2"
      v-for="(answerChoice, index) in selectedAnswers"
      :key="index"
    >
      <BaseInput
        role="textbox"
        :placeholder="`${edit ? 'Write Your Answer' : ''}`"
        type="text"
        :class="`join-item input ${
          edit ? 'input-secondary' : 'input-disabled'
        }`"
        v-model="selectedAnswers[index]"
      />
      <BasicButton
        role="button"
        name="remove-answer"
        @click="removeAnswerChoice(index)"
        type="button"
        v-if="edit"
      >
        Remove Answer
      </BasicButton>

      <input
        role="checkbox"
        :value="answerChoice"
        @change="(e) => onValueUpdate(e)"
        :checked="isAnswerSelected(answerChoice)"
        :aria-label="'Correct answer'"
        class="join-item btn"
        type="checkbox"
      />
    </li>
  </ul>
  <BasicButton
    name="add-answer"
    role="button"
    @click="addAnswerChoice"
    v-if="edit"
    type="button"
    class="btn btn-sm btn-outline"
  >
    Add answer choice
  </BasicButton>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import BasicButton from "../buttons/BasicButton.vue";
import BaseInput from "./BaseInput.vue";

type Answers = {
  answers: string[];
  correct_answers: string[];
};
type MultipleAnswerInputProps = {
  edit?: boolean;
  data: Answers;
  emitAnswers?: (answers: string[], correct_answers: string[]) => void;
};
const props = withDefaults(defineProps<MultipleAnswerInputProps>(), {
  edit: false,
});
const selectedAnswers = ref<string[]>(props.data.answers);
const correct_answers = computed(() => {
  const correctAnswers: string[] = [];
  selectedAnswers.value.forEach((answerChoice) => {
    if (props.data.correct_answers.includes(answerChoice)) {
      correctAnswers.push(answerChoice);
    }
  });
  return correctAnswers;
});
const removeAnswerChoice = (index: number) => {
  if (selectedAnswers.value.length > 2) {
    selectedAnswers.value.splice(index, 1);
    correct_answers.value.splice(index, 1);
  }
};
const addAnswerChoice = () => {
  selectedAnswers.value.push("");
};
const isAnswerSelected = (answerChoice: string) => {
  return correct_answers.value.includes(answerChoice);
};
const onValueUpdate = (e: Event) => {
  const targetValue = (e.target as HTMLInputElement).value;
  const correctAnswersIndex = correct_answers.value.indexOf(targetValue);

  if (correctAnswersIndex !== -1) {
    correct_answers.value.splice(correctAnswersIndex, 1);
  } else {
    correct_answers.value.push(targetValue);
  }

  props.emitAnswers?.(selectedAnswers.value, correct_answers.value);
};
</script>
