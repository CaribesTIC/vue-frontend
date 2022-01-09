//import { defineAsyncComponent } from "vue"
import {createRouter, createWebHistory} from 'vue-router'
import store from "@/store/index"
import auth from "@/middleware/auth"
import admin from "@/middleware/admin"
import guest from "@/middleware/guest"
import middlewarePipeline from "@/router/middlewarePipeline"

const routes = [{
    path: '/',
    name: 'Home',
    meta: { middleware: [guest], layout: "empty" },      
    component: () => import("@/views/Home/Index.vue")
    //component: () => new Promise(resolve => resolve(defineAsyncComponent(() => import("@/components/About.vue"))))   
    //component: defineAsyncComponent(() => import("@/components/About.vue"))
}, {
    path: '/about',
    name: 'About',  
    component: () => import("@/components/About.vue")
}, {
    path: "/dashboard",
    name: "dashboard",
    meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Dashboard/Index.vue"),
}, {
    path: "/products",
    name: "Products",
    meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Shopcart/Tabs.vue"),
}, {
    path: "/profile",
    name: "profile",
    meta: { middleware: [auth] },
    component: () => import("@/views/Profile.vue"),
}, {
    path: "/users",
    name: "users",
    meta: { middleware: [auth] },
    component: () => import("@/views/Users/Index.vue"),
}, {
    path: "/users/create",
    name: "userCreate",
    meta: { middleware: [auth] },
    component: () => import("@/views/Users/Create.vue"),
    props: true
}, {
    path: "/users/show/:id",
    name: "userShow",
    meta: { middleware: [auth] },
    component: () => import("@/views/Users/Show.vue"),
    props: true
}, {
    path: "/users/edit/:id",
    name: "userEdit",
    meta: { middleware: [auth] },
    component: () => import("@/views/Users/Edit.vue"),
    props: true    
}, {
    path: "/login",
    name: "login",
    meta: { middleware: [guest], layout: "empty" },
    component: () => import("@/views/Login/Index.vue"),
}, {
    path: "/register",
    name: "register",
    meta: { middleware: [guest], layout: "empty" },
    component: () => import("@/views/Register.vue"),
}, {
    path: "/reset-password",
    name: "reset-password",
    meta: { middleware: [guest], layout: "empty" },
    component: () => import("@/views/ResetPassword.vue"),
}, {
    path: "/forgot-password",
    name: "forgot-password",
    meta: { middleware: [guest], layout: "empty" },
    component: () => import("@/views/ForgotPassword.vue" ),
}, {
    path: "/card",
    name: "card",
    meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Themes/Card.vue"),
}, {
    path: "/ui-elements",
    name: "ui-elements",
    meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Themes/UIElements.vue"),
}, {
    path: "/tables",
    name: "tables",
    meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Themes/Tables.vue"),
}, {
    path: "/forms",
    name: "forms",
    meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Themes/Forms.vue"),
}, {
    path: "/modal",
    name: "modal",
    meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Themes/Modal.vue"),
}, {
    path: "/blank",
    name: "blank",
    meta: { 
    //middleware: [auth],
    layout: "default"},
    component: () => import("@/views/Themes/Blank.vue"),
}, {
    path: "/:catchAll(.*)",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
}]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),  
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

export default router
