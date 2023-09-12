import { createRouter, createWebHistory } from "vue-router";
import { BookDetail, Home, Login, Register } from "../pages";
import { GetUser } from "./../modules/auth/service";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/book/detail",
    component: BookDetail,
  },
  {
    path: "/auth/login",
    component: Login,
  },
  {
    path: "/auth/register",
    component: Register,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const user = await GetUser();

  if (to.path === "/") {
    if (user) {
      next();
    } else {
      next("/auth/login");
    }
  } else if (to.path === "/auth/login" || to.path === "/auth/register") {
    if (user) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
