import axios from "axios";
const state = () => ({
  activityList: [],
});
const mutations = {
  SetActivity(state, list) {
    state.activityList = list;
  },
};
const getters = {
  GetActivityList: (state) => state.activityList,
};
const actions = {
  async fetchActivity({ commit }) {
    const res = await axios.get("/api/activity/");
    commit("SetActivity", res.data.result);
  },
  PostActivity({ commit }, payload) {
    console.log(payload);
    commit();
    return;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
