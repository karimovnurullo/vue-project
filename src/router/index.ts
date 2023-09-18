import { createRouter, createWebHistory } from "vue-router";
import { BookDetail, Favorites, Home, LoginToken } from "../pages";
import { getSession } from "@/modules/session";

const routes = [
  {
    path: "/",
    component: Home,
    meta: { home: true },
  },
  {
    path: "/favorites",
    component: Favorites,
    meta: { home: true },
  },
  {
    path: "/book/detail/:id",
    component: BookDetail,
    meta: { home: true },
  },
  {
    path: "/auth/login",
    component: LoginToken,
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
  // const user = await GetUser();
  const user = getSession();

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
