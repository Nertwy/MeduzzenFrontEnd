import { Company, User } from "../types";
import { InjectionKey } from "vue";

import { Store, createStore, useStore as baseStore, ActionContext } from "vuex";
import { TypedDispatchAndAction } from "../types";

type State = {
  count: number;
  test: string;
  user: User | null;
  userById: User | null;
  usersList: User[];
  companyList: Company[];
  selectedCompany: Company;
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
  addCompanyToList(state: State, payload: Company) {
    state.companyList.push(payload);
  },
  changeUserList(state: State, payload: User[]) {
    state.usersList = payload;
  },
  removeUserFromList(state: State, user_id: number) {
    state.usersList = state.usersList.filter((val) => val.id !== user_id);
  },
  changeCompanyList(state: State, payload: Company[]) {
    state.companyList = payload;
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
  updateCompanyFromList(state: State, newCompany: Partial<Company>) {
    const index = state.companyList.findIndex(
      (company) => company.id === newCompany.id
    );
    if (index !== -1) {
      state.companyList[index] = {
        ...state.companyList[index],
        ...newCompany,
      };
    }
  },
  removeCompanyFromList(state: State, company_id: number) {
    state.companyList = state.companyList.filter(
      (val) => val.id !== company_id
    );
  },
  setSelectedCompany(state: State, payload: Company) {
    state.selectedCompany = payload;
  },
};
export const actions = {
  removeUserFromList({ commit }: ActionContext<State, State>, payload: User) {
    commit("removeUserFromList", payload);
  },
  addUserToList({ commit }: ActionContext<State, State>, payload: User) {
    commit("addUserToList", payload);
  },
  addCompanyToList({ commit }: ActionContext<State, State>, payload: Company) {
    commit("addCompanyToList", payload);
  },
  setUser({ commit }: ActionContext<State, State>, payload: User) {
    commit("userLogin", payload);
  },
  updateUserFromList({ commit }: ActionContext<State, State>, payload: User) {
    commit("updateUserFromList", payload);
  },
  changeUserList({ commit }: ActionContext<State, State>, payload: User[]) {
    commit("changeUserList", payload);
  },
  changeCompanyList(
    { commit }: ActionContext<State, State>,
    payload: Company[]
  ) {
    commit("changeCompanyList", payload);
  },
  updateCompanyFromList(
    { commit }: ActionContext<State, State>,
    payload: Partial<Company>
  ) {
    commit("updateCompanyFromList", payload);
  },
  removeCompanyFromList(
    { commit }: ActionContext<State, State>,
    payload: number
  ) {
    commit("removeCompanyFromList", payload);
  },
  setSelectedCompany(
    { commit }: ActionContext<State, State>,
    payload: Company
  ) {
    commit("setSelectedCompany", payload);
  },
};
export const storeInitializer = {
  state: {
    count: 0,
    test: "test String",
    user: null,
    userById: null,
    usersList: [],
    companyList: [],
    selectedCompany: {
      id: -1,
      description: "",
      is_visible: false,
      name: "",
      owner: -1,
      members: [],
    },
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
