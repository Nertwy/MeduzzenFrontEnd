import { AnswerChoice, Question, Quiz, UserLastQuizStat } from "@/types";

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

export const formatUpdatedAt = (obj: UserLastQuizStat) => {
  const date = new Date(obj.updated_at);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDate = date.toLocaleString("en-US", options);
  obj.updated_at = formattedDate;
  return obj;
};
