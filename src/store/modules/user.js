import axios from "axios";
import router from "../../router";

const state = () => ({
  userID: "",
  userName: "",
});

const mutations = {
  updateState(state, caches) {
    const { id, name } = caches;
    if (id && name) {
      state.userID = id;
      state.userName = name;
      localStorage.setItem("account_basic_Info", JSON.stringify(caches));
      localStorage.setItem("userID", id);
      localStorage.setItem("userName", name);
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
    commit("updateState", res.data.result);
  },
  async Logout({ commit }) {
    await axios.delete("/api/auth/login").then(() => router.replace("/login"));
    commit("updateState", {});
  },
  async LoginState({ commit }) {
    const res = await axios.get("/api/auth/valid");
    if (!res.data.isLogin) {
      commit("updateState", {});
      return res.data.isLogin;
    }
    commit("updateState", res.data.result);
    return res.data.isLogin;
  },
};

const getters = {
  GetUserName(state) {
    return state.userName;
  },
  GetUserID(state) {
    return state.userID;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
