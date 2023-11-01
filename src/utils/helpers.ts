import { AnswerChoice, Question, Quiz } from "@/types";

export const findByKey = <T>(
  items: T[],
  searchingItem: any,
  key?: keyof T
): number => {
  if (key) {
    return items.findIndex((item) => item[key] === searchingItem);
  } else {
    return items.findIndex((item) => item === searchingItem);
  }
};
