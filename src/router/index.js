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
    component: () => import("@/views/Home/Index.vue").then(m => m.default)
    //component: () => new Promise(resolve => resolve(defineAsyncComponent(() => import("@/components/About.vue"))))   
    //component: defineAsyncComponent(() => import("@/components/About.vue"))
}, {
    path: '/about',
    name: 'About',  
    component: () => import("@/components/About.vue").then(m => m.default)
}, {
    path: "/dashboard",
    name: "dashboard",
    meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Dashboard/Index.vue").then(m => m.default),
}, {
    path: "/products",
    name: "Products",
    meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Shopcart/Tabs.vue").then(m => m.default),
//}, {
//    path: "/profile",
//    name: "profile",
//    meta: { middleware: [auth] },
//    component: () => import("@/views/Profile.vue").then(m => m.default),
}, {
    path: "/xsers",
    name: "xsers",
    meta: { middleware: [auth] },
    component: () => import("@/views/Xsers/Index.vue").then(m => m.default),  
}, {
    path: "/users",
    name: "users",
    meta: { middleware: [auth] },
    component: () => import("@/views/Users/Index.vue").then(m => m.default),
}, {
    path: "/users/create",
    name: "userCreate",
    meta: { middleware: [auth] },
    component: () => import("@/views/Users/Create.vue").then(m => m.default),
    props: true
}, {
    path: "/users/show/:id",
    name: "userShow",
    meta: { middleware: [auth] },
    component: () => import("@/views/Users/Show.vue").then(m => m.default),
    props: true
}, {
    path: "/users/edit/:id",
    name: "userEdit",
    meta: { middleware: [auth] },
    component: () => import("@/views/Users/Edit.vue").then(m => m.default),
    props: true    
}, {
    path: "/login",
    name: "login",
    meta: { middleware: [guest], layout: "empty" },
    component: () => import("@/views/Login/Index.vue").then(m => m.default),
}, {
    path: "/register",
    name: "register",
    meta: { middleware: [guest], layout: "empty" },
    component: () => import("@/views/Register/Index.vue").then(m => m.default),
//}, {
//    path: "/reset-password",
//    name: "reset-password",
//    meta: { middleware: [guest], layout: "empty" },
//    component: () => import("@/views/ResetPassword.vue").then(m => m.default),
//}, {
//    path: "/forgot-password",
//    name: "forgot-password",
//    meta: { middleware: [guest], layout: "empty" },
//    component: () => import("@/views/ForgotPassword.vue" ).then(m => m.default),
}, {
    path: "/card",
    name: "card",
    meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Themes/Card.vue").then(m => m.default),
}, {
    path: "/ui-elements",
    name: "ui-elements",
    meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Themes/UIElements.vue").then(m => m.default),
}, {
    path: "/tables",
    name: "tables",
    meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Themes/Tables.vue").then(m => m.default),
}, {
    path: "/forms",
    name: "forms",
    meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Themes/Forms.vue").then(m => m.default),
}, {
    path: "/modal",
    name: "modal",
    meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Themes/Modal.vue").then(m => m.default),
}, {
    path: "/blank",
    name: "blank",
    meta: { 
    //middleware: [auth],
    layout: "default"},
    component: () => import("@/views/Themes/Blank.vue").then(m => m.default),
}, {
    path: "/:catchAll(.*)",
    name: "notfound",
    component: () => import("@/views/NotFound.vue").then(m => m.default),
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
