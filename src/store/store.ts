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
};

export const key: InjectionKey<Store<State>> = Symbol();
export const MutationTypes = {
  increment: "increment",
  changeString: "changeString",
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
};

const actions = <ActionTree<State, any>>{
  //This is Async mutations
};
const store = createStore<State>({
  state: {
    count: 0,
    test: "test String",
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
});
export const useStore = () => {
  return baseUseStore(key);
};
export default store;
