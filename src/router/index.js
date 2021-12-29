import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
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

router.beforeEach(async (to, from, next) => {
  const isLogin = store.dispatch("user/LoginState");
  if (to.path === "/") {
    next();
    return;
  }
  if (to.path === "/login" && localStorage.getItem("user")) {
    if (isLogin) {
      next("/");
      return;
    }
  }
  if (to.path !== "/login" && !isLogin) {
    next("/login");
    return;
  }
  next();
});

export default router;
