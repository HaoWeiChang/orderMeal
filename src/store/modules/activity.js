import axios from "axios";

const state = () => ({
  activityList: [],
  activityInfo: null,
  orderHistory: [],
  activityContent: [],
  totalPay: 0,
});

const mutations = {
  SetActivityList(state, caches) {
    state.activityList = caches;
  },
  PushActivityList(state, caches) {
    state.activityList.unshift(caches);
  },
  FilterActivityList(state, caches) {
    const activityList = state.activityList;
    state.activityList = activityList.filter((item) => item.id !== caches);
  },
  SetActivity(state, caches) {
    state.activityInfo = caches;
  },
  SetOrderHistory(state, caches) {
    state.orderHistory = caches;
  },
  SetActivityContent(state, caches) {
    state.activityContent = caches;
  },
};

const actions = {
  async fetchActivity({ commit }) {
    await axios
      .get("/api/activity")
      .then((res) => commit("SetActivityList", res.data.result));
  },
  async PostActivity({ commit }, payload) {
    let _payload = payload;
    await axios.post("/api/activity", payload).then((res) => {
      _payload.id = res.data.result.activityID;
      commit("PushActivityList", _payload);
    });
  },
  async DeleteActiviy({ commit }, query) {
    await axios
      .delete(`/api/activity?activityID=${query}`)
      .then(() => commit("FilterActivityList", query));
  },
  async GetActivity({ dispatch, commit }, params) {
    await axios.get(`/api/activity/${params}`).then((res) => {
      commit("SetActivity", res.data.result);
      dispatch("stores/GetStore", res.data.result.store_id, {
        root: true,
      });
    });
  },
  async GetOrderHistory({ commit }) {
    await axios
      .get("/api/activity/history/order")
      .then((res) => commit("SetOrderHistory", res.data.result));
  },
  async GetAcitvityContent({ commit }, params) {
    await axios
      .get(`/api/activity/${params}/content`)
      .then((res) => commit("SetActivityContent", res.data.result));
  },
};

const getters = {
  GetActivity(state) {
    return state.activityList;
  },
  GetActivityInfo(state) {
    return state.activityInfo;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
