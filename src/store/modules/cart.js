// import axios from "axios";

import axios from "axios";

const state = () => ({
  storeID: null,
  activityID: null,
  items: [],
});

const mutations = {
  SetCartInfo(state, caches) {
    state.storeID = caches.storeID;
    state.activityID = caches.activityID;
  },
  PushItem(state, id) {
    state.items.push({ id: id, num: 1 });
  },
  AddItem(state, id) {
    const cartItem = state.items.find((item) => item.id === id);
    cartItem.num++;
  },
  reduceItem(state, id) {
    const cartItem = state.items.find((item) => item.id === id);
    cartItem.num--;
  },
  removeItem(state, id) {
    state.items = state.items.filter((item) => item.id !== id);
  },
  CleanCart(state) {
    state.storeID = null;
    state.activityID = null;
    state.items = [];
  },
};

const actions = {
  async DefaultCart({ commit }, payload) {
    commit("SetCartInfo", payload);
  },
  async AddMealToCart({ state, commit }, id) {
    const cartItem = state.items.find((item) => item.id === id);
    if (!cartItem) {
      commit("PushItem", id);
    } else {
      commit("AddItem", id);
    }
  },
  reduceMealToCart({ state, commit }, id) {
    const cartItem = state.items.find((item) => item.id === id);
    if (cartItem === undefined) return Promise.reject("你好像沒加進購物出喔");
    if (cartItem.num === 1) {
      commit("removeItem", id);
    } else commit("reduceItem", id);
  },
  async CleanCart({ commit }) {
    commit("CleanCart");
  },
  async CommitCart({ commit }, payload) {
    await axios
      .post("/api/activity/order", payload)
      .then(() => commit("CleanCart"));
  },
};

const getters = {
  GetcartItem: (state, getters, rootState) => {
    return state.items.map(({ id, num }) => {
      const item = rootState.stores.storeMeal.find((item) => item.id === id);
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        note: item.note,
        num,
      };
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
