import axios from "axios";

const state = () => ({
  userID: "",
  userName: "",
});

const mutations = {
  updateState(state, caches) {
    if (caches === null) {
      state.userID = "";
      state.userName = "";
      localStorage.clear();
      return;
    }
    const { id, name } = caches;
    state.userID = id;
    state.userName = name;
    localStorage.setItem("account_basic_info", JSON.stringify(caches));
    localStorage.setItem("userID", id);
    localStorage.setItem("userName", name);
  },
  resetState(state, caches) {
    if (caches === null) return;
    const { id, name } = caches;
    state.userID = id;
    state.userName = name;
  },
};

const actions = {
  async Login({ commit }, payload) {
    console.log(payload);
    return await axios.post("/api/auth/login", payload).then((res) => {
      if (res.status === 200) return Promise.reject(res.data.message);
      commit("updateState", res.data.result);
      return Promise.resolve(res.data.message);
    });
  },
  async Logout({ commit }) {
    return await axios.delete("/api/auth/login").then((res) => {
      commit("updateState", null);
      return Promise.resolve(res.data.message);
    });
  },
  async LoginState({ commit }) {
    const res = await axios.get("/api/auth/valid");
    if (!res.data.isLogin) {
      commit("updateState", null);
      return res.data.isLogin;
    }
    commit("updateState", res.data.result);
    return res.data.isLogin;
  },
  async localStorageUserInfo({ commit }) {
    const userInfo = JSON.parse(localStorage.getItem("account_basic_info"));
    commit("resetState", userInfo);
  },
  async Register({ dispatch }, payload) {
    await axios
      .post("/api/user/account", payload)
      .then((res) => {
        if (res.status === 201) {
          const { email, password } = payload;
          dispatch("Login", { email, password });
        } else return Promise.reject(res.data.error);
      })
      .catch((error) => Promise.reject(error));
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
