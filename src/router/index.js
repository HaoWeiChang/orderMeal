import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";
import Order from "../views/Order.vue";
import GetActivity from "../views/GetActivity.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      {
        path: "",
        name: "",
        component: GetActivity,
      },
      {
        path: "activity/:id",
        name: "activity",
        component: Order,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  store.dispatch("user/localStorageUserInfo");
  if (to.path === "/login") {
    const isLogin = await store.dispatch("user/LoginState");
    if (!isLogin) {
      return true;
    }
    return router.replace("/");
  } else if (to.path === "/") {
    return true;
  } else {
    return true;
  }
});

export default router;
