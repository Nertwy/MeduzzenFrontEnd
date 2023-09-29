import { InjectionKey } from "vue";
import {
  ActionTree,
  GetterTree,
  MutationTree,
  Store,
  createStore,
  useStore as baseUseStore,
} from "vuex";

type State = {
  count: number;
  test: string;
  user: User | null;
};

export const key: InjectionKey<Store<State>> = Symbol();
export const MutationTypes = {
  increment: "increment",
  changeString: "changeString",
  userLogin: "userLogin",
  userLogout: "userLogout",
};
const getters = <GetterTree<State, any>>{
  //For getting data with some filtration or sort
  stringUpper: (state: State) => state.test.toUpperCase(),
};
const mutations = <MutationTree<State>>{
  //only sync operations here
  [MutationTypes.increment](state: State) {
    state.count++;
  },
  [MutationTypes.userLogin](state: State, payload: User) {
    state.user = payload;
  },
  [MutationTypes.userLogout](state: State) {
    state.user = null;
  },
};

const actions = <ActionTree<State, any>>{
  //This is Async mutations
};
const store = createStore<State>({
  state: {
    count: 0,
    test: "test String",
    user: null,
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
});
export const useStore = () => {
  return baseUseStore(key);
};
export default store;
