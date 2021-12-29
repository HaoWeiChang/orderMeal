import axios from "axios";

const state = () => ({
  isLogin: false,
  userID: "",
  userName: "",
});

const mutations = {
  updateState(state, caches) {
    const { id, name, isLogin } = caches;
    if (id && name && isLogin) {
      state.isLogin = isLogin;
      const user = { id: id, name: name };
      state.userID = user.id;
      state.userName = user.name;
      if (!localStorage.getItem("user"))
        localStorage.setItem("user", JSON.stringify(user));
    } else {
      state.isLogin = false;
      state.userID = "";
      state.userName = "";
      localStorage.clear();
    }
  },
};

const actions = {
  async Login({ commit }, payload) {
    const res = await axios.post("/api/auth/login", payload);
    commit("updateState", res.data);
  },
  async Logout({ commit }) {
    await axios.delete("/api/auth/login");
    commit("updateState", {});
  },
  async LoginState({ commit }) {
    const res = await axios.get("/api/auth/valid");
    if (!res.data.isLogin) {
      commit("updateState", {});
      return res.data.isLogin;
    }
    if (localStorage.getItem("user")) {
      commit("updateState", res.data);
    }
    return res.data.isLogin;
  },
};

const getters = {
  userData: (state) => {
    state.caches = JSON.parse(localStorage.getItem("user")) ?? {};
    return state.caches;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
