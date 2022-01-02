import axios from "axios";
const state = () => ({
  activityList: [],
});
const mutations = {
  SetActivity(state, caches) {
    state.activityList = caches;
  },
  PushActivity(state, caches) {
    state.activityList.unshift(caches);
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
    let _payload = payload;
    await axios.post("/api/activity", payload).then((res) => {
      _payload.id = res.data.result.activityID;
      commit("PushActivity", _payload);
    });
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
