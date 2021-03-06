import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";
import Order from "../views/Order.vue";
import GetActivity from "../views/ActivityList.vue";
import OrderHistory from "../views/OrderHistory.vue";
import ActivityContent from "../views/ActivityContent.vue";
import ActivityHistory from "../views/ActivityHistory.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      {
        path: "",
        name: "activityList",
        component: GetActivity,
      },
      {
        path: "activity/:id/order",
        name: "order",
        component: Order,
      },
      {
        path: "activity/:id",
        name: "activity",
        component: ActivityContent,
      },
      {
        path: "activity/history",
        name: "activity_history",
        component: ActivityHistory,
      },
      {
        path: "activity/history/order",
        name: "order_history",
        component: OrderHistory,
      },
    ],
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/Manager/AdminHome.vue"),
    children: [
      {
        path: "userlist",
        name: "admin_userlist",
        component: () => import("../views/Manager/UsersList.vue"),
      },
      {
        path: "storelist",
        name: "admin_storelist",
        component: () => import("../views/Manager/StoresList.vue"),
      },
      {
        path: "sqlcommand",
        name: "admin_sqlcommand",
        component: () => import("../views/Manager/SQLCommand.vue"),
      },
      {
        path: "storemenu/:id",
        name: "admin_storemenu",
        component: () => import("../views/Manager/StoreMenu.vue"),
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
const managerList = [6, 48];
router.beforeEach(async (to, from) => {
  store.dispatch("user/localStorageUserInfo");
  if (from.name === "order") store.commit("cart/CleanCart");
  if (to.path === "/login") {
    const isLogin = await store.dispatch("user/LoginState");
    if (!isLogin) {
      return true;
    }
    return router.replace("/");
  } else if (to.path === "/") {
    return true;
  } else if (to.matched[0].path === "/admin") {
    return managerList.includes(store.state.user.userID)
      ? true
      : router.replace("/");
  } else {
    return true;
  }
});

export default router;
