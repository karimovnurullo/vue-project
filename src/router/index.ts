import { createRouter, createWebHistory } from "vue-router";
import { BookDetail, Home, Login, Register } from "../pages";
import { GetUser } from "../modules/auth/service";

const routes = [
  {
    path: "/",
    component: Home,
    meta: { home: true },
  },
  {
    path: "/book/detail/:id",
    component: BookDetail,
    meta: { home: true },
  },
  {
    path: "/auth/login",
    component: Login,
    meta: { auth: true },
  },
  {
    path: "/auth/register",
    component: Register,
    meta: { auth: true },
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

  if (to.meta.home) {
    if (user) {
      next();
    } else {
      next("/auth/login");
    }
  } else if (to.meta.auth) {
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
