import axios from "axios";

const state = () => ({
  activityList: [],
  activityInfo: {},
  historyList: [],
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
  SetHistory(state, caches) {
    state.historyList = caches;
  },
  SetActivityContent(state, caches) {
    state.activityContent = caches.activity;
    state.totalPay = caches.totalPay;
  },
  UpdateActivityInfo_Valid(state, valid) {
    state.activityInfo.valid = valid;
  },
  DeleteActivtyHistory(state, id) {
    const activity = state.historyList.find((item) => item.id === id);
    activity.Isdelete = 1;
  },
  DeleteOrderHistory(state, id) {
    const orderhistory = state.historyList.find(
      (item) => item.historyID === id
    );
    orderhistory.historyDelete = 1;
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
  async GetAcitvityContent({ commit }, params) {
    await axios
      .get(`/api/activity/${params}/content`)
      .then((res) => commit("SetActivityContent", res.data.result));
  },
  async GetActivityHistory({ commit }) {
    await axios
      .get("/api/activity/history")
      .then((res) => commit("SetHistory", res.data.result));
  },
  async DeleteActivtyHistory({ commit }, query) {
    await axios
      .delete(`/api/activity?activityID=${query}`)
      .then(commit("DeleteActivtyHistory", query));
  },
  async GetOrderHistory({ commit }) {
    await axios
      .get("/api/activity/history/order")
      .then((res) => commit("SetHistory", res.data.result));
  },
  async DeleteOrderHistory({ commit }, query) {
    await axios
      .delete(`/api/activity/order?historyID=${query}`)
      .then(() => commit("DeleteOrderHistory", query));
  },
  async validActivity({ commit }, payload) {
    await axios
      .patch(`/api/activity/${payload.activityID}/content`, payload)
      .then(() => commit("UpdateActivityInfo_Valid", payload.valid));
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
