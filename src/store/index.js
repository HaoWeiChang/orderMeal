import axios from "axios";
import { createStore } from "vuex";

const user = {
  state: {
    isLogin: false,
    caches: {},
  },
  mutations: {
    updateState(state, caches) {
      const { id, name, isLogin } = caches;
      if (id && name && isLogin) {
        state.isLogin = isLogin;
        state.caches = caches;
        localStorage.setItem("user", JSON.stringify(state.caches));
      } else {
        state.isLogin = false;
        state.caches = {};
        localStorage.clear();
      }
    },
  },
  getters: {
    loginState: async (state) => {
      const res = await axios.get("/api/auth/valid");
      state.isLogin = res.data.loginState;
      return state.isLogin;
    },
    userData: (state) => {
      state.caches = JSON.parse(localStorage.getItem("user")) ?? {};
      return state.caches;
    },
  },
  actions: {
    async Login({ commit }, payload) {
      const res = await axios.post("/api/auth/login", payload);
      commit("updateState", res.data);
    },
    async Logout({ commit }) {
      const res = await axios.delete("/api/auth/login");
      commit("updateState", {});
      return res;
    },
  },
};

const activity = {
  state: {
    activityList: [],
  },
  mutations: {
    SetActivity(state, list) {
      state.activityList = list;
    },
  },
  getters: {
    GetActivityList: (state) => state.activityList,
  },
  actions: {
    async fetchActivity({ commit }) {
      const res = await axios.get("/api/activity/");
      commit("SetActivity", res.data.result);
    },
  },
};

export default createStore({ modules: { user, activity } });
