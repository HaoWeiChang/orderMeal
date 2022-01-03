import axios from "axios";
const state = () => ({
  storeOptionList: [],
  storeInfo: {},
  storeMeal: [],
});
const mutations = {
  UpdateStoreList(state, caches) {
    let optionList = [];
    caches.forEach((element) => {
      optionList.push({ value: element.id, label: element.name });
    });
    state.storeOptionList = optionList;
  },
  UpdateStore(state, caches) {
    state.storeInfo = caches.store;
    state.storeMeal = caches.meal;
  },
};
const actions = {
  async GetStoreList({ commit }) {
    const res = await axios.get("/api/store");
    commit("UpdateStoreList", res.data.result);
  },
  async GetStore({ commit }, payload) {
    if (payload === undefined) return Promise.reject("空值");
    const res = await axios.get(`/api/store/meal/${payload}`);
    commit("UpdateStore", res.data.result);
  },
};
const getters = {
  GetStoreName: (state) => (store_id) => {
    return state.storeList.filter((item) => {
      if (item.id === store_id) return item.name;
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
