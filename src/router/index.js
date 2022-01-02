import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: {
      path: "/order",
      name: "order",
      component: {},
    },
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const isLogin = await store.dispatch("user/LoginState");
  if (to.path === "/login") {
    if (!isLogin) {
      return true;
    }
    return router.replace("/");
  }
  if (isLogin) return isLogin;
  return router.replace("/login");
});
export default router;
