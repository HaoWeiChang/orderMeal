import axios from "axios";
const state = () => ({
  storeOptionList: [],
  storeList: [],
  unitStore: {},
  storeMeal: [],
});
const mutations = {
  UpdateStoreList(state, caches) {
    let optionList = [];
    caches.forEach((element) => {
      optionList.push({ value: element.id, label: element.name });
    });
    state.storeOptionList = optionList;
    state.storeList = caches;
  },
};
const actions = {
  async GetStoreList({ commit }) {
    const res = await axios.get("/api/store");
    commit("UpdateStoreList", res.data.result);
  },
};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
