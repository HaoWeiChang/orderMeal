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
    state.storeInfo = caches.result.storeInfo;
    state.storeMeal = caches.result.storeMeal;
  },
};
const actions = {
  async GetStoreList({ commit }) {
    const res = await axios.get("/api/store");
    commit("UpdateStoreList", res.data.result);
  },
  // async GetStore({ commit }, payload) {
  //   await axios.get();
  // },
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
