import axios from "axios";
const state = () => ({
  activityList: [],
});
const mutations = {
  SetActivity(state, caches) {
    state.activityList = caches;
  },
  PushActivity(state, caches) {
    state.activityList.push(caches);
  },
  FilterActivity(state, caches) {
    const activityList = state.activityList;
    state.activityList = activityList.filter((item) => item.id !== caches);
  },
};

const actions = {
  async fetchActivity({ commit }) {
    await axios
      .get("/api/activity")
      .then((res) => commit("SetActivity", res.data.result));
  },
  async PostActivity({ commit }, payload) {
    await axios
      .post("/api/activity", payload)
      .then(() => commit("PushActivity", payload));
  },
  async DeleteActiviy({ commit }, query) {
    console.log(query);
    await axios
      .delete(`/api/activity?activityID=${query}`)
      .then(() => commit("FilterActivity", query));
  },
};
const getters = {
  GetActivity(state) {
    return state.activityList;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
