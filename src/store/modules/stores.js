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
    state.storeMeal = caches.meal.map((item) => {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        note: item.note,
        num: 0,
      };
    });
    state.storeInfo = caches.store;
  },
};
const actions = {
  async GetStoreList({ commit }) {
    const res = await axios.get("/api/store");
    commit("UpdateStoreList", res.data.result);
  },
  async GetStore({ commit }, payload) {
    if (payload === undefined) return Promise.reject("空值");
    await axios
      .get(`/api/store/meal/${payload}`)
      .then((res) => commit("UpdateStore", res.data.result));
  },
};
const getters = {
  GetStoreName: (state) => (store_id) => {
    return state.storeList.filter((item) => {
      if (item.id === store_id) return item.name;
    });
  },
  GetStoreInfo: (state) => {
    return state.storeInfo;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
