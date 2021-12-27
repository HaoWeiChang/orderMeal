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
    path: "/Login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const  isLogin  = store.getters.checkLogin;
  if (to.path === "/Login") {
    if (isLogin) {
      next("/");
      return;
    }
    if (to.path !== "/Login") {
      next("/Login");
      return;
    }
    if (to.path === "/" && isLogin) {
      next("/");
      return;
    }
  }
  next();
});

export default router;
