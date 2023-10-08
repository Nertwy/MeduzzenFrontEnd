import { Url } from "url";
import { actions } from "./store/store";

type Flag = "🇺🇸" | "🇺🇦";
type Language = "en" | "uk";
type LanguageAndFlag = [Language, Flag];

type User = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
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
  owner: User | null;
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
