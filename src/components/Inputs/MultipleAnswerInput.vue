<template>
  <ul>
    <li
      class="join join-vertical my-2 ml-2"
      v-for="(answerChoice, index) in data.answers"
      :key="index"
    >
      <BaseInput
        :placeholder="`${edit ? 'Write Your Answer' : ''}`"
        type="text"
        :class="`join-item input ${
          edit ? 'input-secondary' : 'input-disabled'
        }`"
        v-bind:model-value="answerChoice"
      />
      <BasicButton @click="removeAnswerChoice(index)" type="button" v-if="edit">
        Remove Answer
      </BasicButton>

      <BaseInput
        @vnode-updated="debug"
        :aria-label="'Correct answer'"
        class="join-item btn"
        type="checkbox"
        v-model="correct_answers[index]"
        :true-value="answerChoice"
        :false-value="''"
      />
    </li>
  </ul>
  <button @click="debug" type="button">Click</button>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import BasicButton from "../buttons/BasicButton.vue";
import BaseInput from "./BaseInput.vue";
type Answers = {
  answers: string[];
  correct_answers: string[];
};
type Props = {
  edit?: boolean;
  data: Answers;
  emitAnswers?: (answers: string[], correct_answers: string[]) => void;
};
const props = withDefaults(defineProps<Props>(), {
  edit: false,
});
const selectedAnswers = ref<string[]>(props.data.answers);
const correct_answers = ref<string[]>([]);
const removeAnswerChoice = (index: number) => {
  if (selectedAnswers.value.length > 2) {
    selectedAnswers.value.splice(index, 1);
    correct_answers.value.splice(index, 1);
  }
};
const deleteEmptyStrings = <T>(array: T[]): T[] => {
  const new_array: T[] = [];
  for (const value of array) {
    if (value) {
      new_array.push(value);
    }
  }
  return new_array;
};
const debug = () => {
    console.log(correct_answers.value);
    
  props.emitAnswers?.(
    selectedAnswers.value,
    deleteEmptyStrings(correct_answers.value)
  );
};

onMounted(() => {
  props.data.correct_answers.forEach((answerChoice) => {
    const index = props.data.answers.indexOf(answerChoice);
    if (index !== -1) {
      correct_answers.value.push(answerChoice);
    }
  });
});
</script>
