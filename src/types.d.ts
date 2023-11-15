import { Url } from "url";
import { actions } from "./store/store";
import { RenderOptions } from "@testing-library/vue";
type Language = "en" | "uk";
type LanguageAndFlag = [Language, Flag];

type Flag = "🇺🇸" | "🇺🇦";
type User = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  image_path?: string;
  avarage_score?: number;
  is_owner?: boolean;
  is_admin?: boolean;
};
type GoogleUser = {
  name: string;
  given_name: string;
  family_name: string;
  picture: Url;
  email: string;
  locale: string;
};
type PageWith<T> = {
  count: number;
  next: Url | null;
  previous: Url | null;
  results: Array<T>;
};
type Company = {
  id: number;
  name: string;
  description: string;
  owner: number | null;
  is_visible: boolean;
  members: User[];
};
type RegisterUser = {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  re_password: string;
  email: string;
};

type InvitationRequest = {
  id: number;
  sender: number;
  receiver: number;
  company: number;
  invitation_type: "invitation" | "request";
  accepted: boolean;
  declined: boolean;
  created_at: string;
  updated_at: string;
};

type Members = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  isOwner: boolean;
};
type InvitationToCompany = {
  id: number;
  senderFirstName: string;
  senderLastName: string;
  company_id: number;
};
type InvitationToUser = {
  id: number;
  company_name: string;
  senderLastName: string;
  company_id: number;
};

type ResetPassword = {
  current_password: string;
  re_new_password: string;
  new_password: string;
};

type Quiz = {
  id?: number;
  title: string;
  description: string;
  questions: Array<Question>;
  company: null | number;
};

type Question = {
  id?: number;
  question: string;
  answer: string[];
  correct_answer: Array<string>;
};

type AnswerChoice = {
  id?: number;
  text: string;
};

type UserLastQuizStat = {
  id: number;
  user: {
    last_name: string;
    email: string;
  };
  company: {
    name: string;
    description: string;
  };
  quiz: number;
  quiz_title: string;
  score: number;
  time_taken: string;
  updated_at: string;
};

type NotificationStatus = {
  UNREAD: "unread";
  READ: "read";
};
type CustomNotification = {
  id?: number;
  text: string;
  status: keyof NotificationStatus;
  recipient: number;
};
type NotificationType =
  | "user_notifications"
  | "send_notification"
  | "read_notification"
  | "new_notification";

type ReadNotification = {
  type: NotificationType;
  id: number;
};
type NewNotification = {
  type: "new_notification";
  notification: CustomNotification;
};
type UserLastTestTime = {
  user_last_test_time: {
    user__email: string;
    last_test_time: string;
  }[];
};

// Test Types

//Store Types
type ActionKeys = keyof typeof actions;

type Length<L extends any[]> = L["length"];

type Function<P extends any[] = any, R extends any = any> = (...args: P) => R;

type ParamLength<Fn extends Function> = Length<Parameters<Fn>>;

type P1<Fn extends (...args: any) => any> = Parameters<Fn>[1];

type Payload<H extends Function> = ParamLength<H> extends 2
  ? P1<H> extends infer X
    ? X
    : never
  : never;

type TypedDispatchOrCommit<
  A extends { [key: string]: Function },
  Options,
  Return,
  K extends keyof A = keyof A
> = {
  <I extends K>(
    key: I,
    ...args: {
      0: [];
      1: [payload: Payload<A[I]>];
    }[Payload<A[I]> extends never ? 0 : 1]
  ): Return;
  <I extends K>(
    key: I,
    ...args: {
      0: [payload: undefined, options: Options];
      1: [payload: Payload<A[I]>, options: Options];
    }[Payload<A[I]> extends never ? 0 : 1]
  ): Return;
};

export type TypedDispatchAndAction<T extends { mutations: any; actions: any }> =
  {
    dispatch: TypedDispatchOrCommit<
      T["actions"],
      DispatchOptions,
      Promise<any>
    >;
    commit: TypedDispatchOrCommit<T["mutations"], CommitOptions, void>;
  };
