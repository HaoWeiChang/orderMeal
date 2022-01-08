import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";
import Order from "../views/Order.vue";
import GetActivity from "../views/ActivityList.vue";
import OrderHistory from "../views/OrderHistory.vue";
import ActivityContent from "../views/ActivityContent.vue";
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
      {
        path: "activity/:id/content",
        name: "content",
        component: ActivityContent,
      },
      {
        path: "activity/history/order",
        name: "orderhistory",
        component: OrderHistory,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
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
  store.commit("cart/CleanCart");
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
