import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store/index";
import auth from "@/middleware/auth";
import admin from "@/middleware/admin";
import guest from "@/middleware/guest";
import middlewarePipeline from "@/router/middlewarePipeline";

const routes = [{
    path: "/",
    name: "home",
    meta: { middleware: [guest], layout: "empty" },
    component: () => import(/* webpackChunkName: "Home" */ "../views/Home"),
  }, {
    path: "/dashboard",
    name: "dashboard",
    meta: { middleware: [auth], layout: "default" },
    component: () => import(/* webpackChunkName: "Dashboard" */ "../views/Dashboard"),
  }, {
    path: "/card",
    name: "card",
    meta: { middleware: [auth], layout: "default" },
    component: () => import(/* webpackChunkName: "Card" */ "../views/Card"),
  }, {
    path: "/ui-elements",
    name: "ui-elements",
    meta: { middleware: [auth], layout: "default" },
    component: () => import(/* webpackChunkName: "UIelements" */ "../views/UIElements"),
  }, {
    path: "/tables",
    name: "tables",
    meta: { middleware: [auth], layout: "default" },
    component: () => import(/* webpackChunkName: "Tables" */ "../views/Tables"),
  }, {
    path: "/forms",
    name: "forms",
    meta: { middleware: [auth], layout: "default" },
    component: () => import(/* webpackChunkName: "Forms" */ "../views/Forms"),
  }, {
    path: "/modal",
    name: "modal",
    meta: { middleware: [auth], layout: "default" },
    component: () => import(/* webpackChunkName: "Modal" */ "../views/Modal"),
  }, {
    path: "/blank",
    name: "blank",
    meta: { middleware: [auth], layout: "default" },
    component: () => import(/* webpackChunkName: "Blank" */ "../views/Blank"),
  }, {
    path: "/user",
    name: "user",
    meta: { middleware: [auth] },
    component: () => import(/* webpackChunkName: "User" */ "../views/User"),
  }, {
    path: "/users",
    name: "users",
    meta: { middleware: [auth] },
    component: () => import(/* webpackChunkName: "Users" */ "../views/Users"),
  }, {
    path: "/login",
    name: "login",
    meta: { middleware: [guest], layout: "empty" },
    component: () => import(/* webpackChunkName: "Login" */ "../views/Login"),
  }, {
    path: "/register",
    name: "register",
    meta: { middleware: [guest], layout: "empty" },
    component: () => import(/* webpackChunkName: "Register" */ "../views/Register"),
  }, {
    path: "/reset-password",
    name: "reset-password",
    meta: { middleware: [guest], layout: "empty" },
    component: () =>
      import(/* webpackChunkName: "ResetPassword" */ "../views/ResetPassword"),
  }, {
    path: "/forgot-password",
    name: "forgot-password",
    meta: { middleware: [guest], layout: "empty" },
    component: () => import( /* webpackChunkName: "ForgotPassword" */ "../views/ForgotPassword" ),
  }, {
    path: "/:catchAll(.*)",
    name: "notfound",
    component: () => import(/* webpackChunkName: "NotFound" */ "../views/NotFound"),
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
