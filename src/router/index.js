import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store/index";
import auth from "@/middleware/auth";
import admin from "@/middleware/admin";
import guest from "@/middleware/guest";
import middlewarePipeline from "@/router/middlewarePipeline";

//Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "home",
    meta: { middleware: [guest], layout: "empty" },
    component: () => import(/* webpackChunkName: "home" */ "../views/Home"),
  }, {
    path: "/dashboard",
    name: "dashboard",
    meta: { middleware: [auth], layout: "default" },
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard"),
  }, {
    path: "/cards",
    name: "card",
    meta: { middleware: [auth], layout: "default" },
    component: () =>
      import(/* webpackChunkName: "card" */ "../views/Card"),
  }, {
    path: "/ui-elements",
    name: "ui-elements",
    meta: { middleware: [auth], layout: "default" },
    component: () =>
      import(/* webpackChunkName: "ui-elements" */ "../views/UIElements"),
  }, {
    path: "/tables",
    name: "tables",
    meta: { middleware: [auth], layout: "default" },
    component: () =>
      import(/* webpackChunkName: "tables" */ "../views/Tables"),
  }, {
    path: "/forms",
    name: "forms",
    meta: { middleware: [auth], layout: "default" },
    component: () =>
      import(/* webpackChunkName: "forms" */ "../views/Forms"),
  }, {
    path: "/modal",
    name: "modal",
    meta: { middleware: [auth], layout: "default" },
    component: () =>
      import(/* webpackChunkName: "modal" */ "../views/Modal"),
  }, {
    path: "/blank",
    name: "blank",
    meta: { middleware: [auth], layout: "default" },
    component: () =>
      import(/* webpackChunkName: "blank" */ "../views/Blank"),
  }, {
    path: "/user",
    name: "user",
    meta: { middleware: [auth] },
    component: () => import(/* webpackChunkName: "user" */ "../views/User"),
  },
  {
    path: "/users",
    name: "users",
    meta: { middleware: [auth, admin] },
    component: () => import(/* webpackChunkName: "users" */ "../views/Users"),
  },
  {
    path: "/login",
    name: "login",
    meta: { middleware: [guest], layout: "empty" },
    component: () => import(/* webpackChunkName: "login" */ "../views/Login"),
  },
  {
    path: "/register",
    name: "register",
    meta: { middleware: [guest], layout: "empty" },
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register"),
  },
  {
    path: "/reset-password",
    name: "resetPassword",
    meta: { middleware: [guest] },
    component: () =>
      import(/* webpackChunkName: "reset-password" */ "../views/ResetPassword"),
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",
    meta: { middleware: [guest] },
    component: () =>
      import(
        /* webpackChunkName: "forgot-password" */ "../views/ForgotPassword"
      ),
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: () =>
      import(/* webpackChunkName: "not-found" */ "../views/NotFound"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const middleware = to.meta.middleware;
  const context = { to, from, next, store };

  if (!middleware) {
    return next();
  }

  middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
