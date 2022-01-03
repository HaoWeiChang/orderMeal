// import axios from "axios";

const state = () => ({
  cartInfo: null,
  cartContents: [],
});

const mutations = {
  SetCartInfo(state, caches) {
    state.cartInfo = caches.activityID;
  },
  // AddToCartContents(state, caches) {},
};

const actions = {
  AddMealToCart({ state, commit }, payload) {
    if (state.cartInfo === null) {
      commit("SetCartInfo", payload);
    }
  },
  reduceMealToCart() {},
  removeMealFromCart() {},
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
