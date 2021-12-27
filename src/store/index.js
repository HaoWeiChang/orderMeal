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
        state.caches.id = id;
        state.caches.name = name;
        localStorage.setItem("user", JSON.stringify(state.caches));
      } else {
        state.isLogin = false;
        state.caches = {};
        localStorage.clear();
      }
    },
  },
  getters: {},
  actions: {
    async Login({ commit }, payload) {
      await axios
        .post("http://localhost:3000/api/auth/Login", payload)
        .then((res) => commit("updateState", res.data))
        .catch((error) => console.log(error));
    },
  },
};

export default createStore({ modules: { user } });
