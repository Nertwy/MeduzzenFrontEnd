import { User } from "../types";
import { InjectionKey } from "vue";

import { Store, createStore, useStore as baseStore, ActionContext } from "vuex";
import { TypedDispatchAndAction } from "../types";

type State = {
  count: number;
  test: string;
  user: User | null;
};

export const MutationTypes = {
  increment: "increment",
  changeString: "changeString",
  userLogin: "userLogin",
  userLogout: "userLogout",
};
export const GetterTypes = {
  getUser: "getUser",
  stringUpper: "stringUpper",
};
export const getters = {
  stringUpper: (state: State) => state.test.toUpperCase(),
  getUser: (state: State) => state.user,
};
const mutations = {
  //only sync operations here
  increment(state: State) {
    state.count++;
  },
  userLogin(state: State, payload: User) {
    state.user = payload;
  },
  userLogout(state: State) {
    state.user = null;
  },
};
export const actions = {
  setUser({ commit }: ActionContext<State, State>, payload: User) {
    commit("userLogin", payload);
  },
};
export const storeInitializer = {
  state: {
    count: 0,
    test: "test String",
    user: null,
  } as State,
  mutations,
  actions,
  getters,
};
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>(storeInitializer);

export const useStoreTyped = () => {
  const keyedStore = baseStore(key);
  return keyedStore as Omit<typeof keyedStore, "dispatch" | "commit"> &
    TypedDispatchAndAction<typeof storeInitializer>;
};
export default useStoreTyped;
