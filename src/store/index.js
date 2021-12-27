import axios from "axios";
import { createStore } from "vuex";

const user = {
  state: {
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
    checkLogin: (state) => {
      state.caches = JSON.parse(localStorage.getItem("user")) ?? {};
      return state.caches;
    },
  },
  actions: {
    async Login({ commit }, payload) {
      const res = await axios.post(
        "http://localhost:3000/api/auth/Login",
        payload
      );
      commit("updateState", res.data);
    },
  },
};

export default createStore({ modules: { user } });
