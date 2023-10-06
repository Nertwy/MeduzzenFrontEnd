import { User } from "../types";
import { InjectionKey } from "vue";

import { Store, createStore, useStore as baseStore, ActionContext } from "vuex";
import { TypedDispatchAndAction } from "../types";

type State = {
  count: number;
  test: string;
  user: User | null;
  userById: User | null;
  usersList: User[];
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
  getUsersList: (state: State) => state.usersList,
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
  addUserToList(state: State, payload: User) {
    state.usersList.push(payload);
  },
  changeUserList(state:State,payload:User[]){
    state.usersList = payload
  },
  removeUserFromList(state: State, user_id: number) {
    state.usersList = state.usersList.filter((val) => val.id !== user_id);
  },
  updateUserFromList(state: State, newUser: Partial<User>) {
    const index = state.usersList.findIndex((user) => user.id === newUser.id);
    if (index !== -1) {
      state.usersList[index] = {
        ...state.usersList[index],
        ...newUser,
      };
    }
  },
};
export const actions = {
  removeUserFromList({ commit }: ActionContext<State, State>, payload: User) {
    commit("removeUserFromList", payload);
  },
  addUserToList({ commit }: ActionContext<State, State>, payload: User) {
    commit("addUserToList", payload);
  },
  setUser({ commit }: ActionContext<State, State>, payload: User) {
    commit("userLogin", payload);
  },
  updateUserFromList({ commit }: ActionContext<State, State>, payload: User) {
    commit("updateUserFromList", payload);
  },
  changeUserList({commit}:ActionContext<State,State>,payload:User[]){
    commit("changeUserList",payload)
  },
};
export const storeInitializer = {
  state: {
    count: 0,
    test: "test String",
    user: null,
    userById: null,
    usersList: [],
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
