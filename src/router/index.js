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
    component: () => import("@/views/Home/Index.vue")
    //component: () => new Promise(resolve => resolve(defineAsyncComponent(() => import("@/components/About.vue"))))   
    //component: defineAsyncComponent(() => import("@/components/About.vue"))
}, {
    path: '/about',
    name: 'About',  
    component: () => import("@/components/About.vue")
}/*, {
    path: "/dashboard",
    name: "dashboard",
    //meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Dashboard"),
}, {
    path: "/products",
    name: "Products",
    //meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Shopcart/Tabs.vue"),
}, {
    path: "/profile",
    name: "profile",
    //meta: { middleware: [auth] },
    component: () => import("@/views/Profile"),
}, {
    path: "/users",
    name: "users",
    //meta: { middleware: [auth] },
    component: () => import("@/views/Users/Index"),
}, {
    path: "/users/create",
    name: "userCreate",
    //meta: { middleware: [auth] },
    component: () => import("@/views/Users/Create"),
    props: true
}, {
    path: "/users/show/:id",
    name: "userShow",
    //meta: { middleware: [auth] },
    component: () => import("@/views/Users/Show"),
    props: true
}, {
    path: "/users/edit/:id",
    name: "userEdit",
    //meta: { middleware: [auth] },
    component: () => import("@/views/Users/Edit"),
    props: true    
}, {
    path: "/login",
    name: "login",
    //meta: { middleware: [guest], layout: "empty" },
    component: () => import("@/views/Login/Index"),
}, {
    path: "/register",
    name: "register",
    //meta: { middleware: [guest], layout: "empty" },
    component: () => import("@/views/Register"),
}, {
    path: "/reset-password",
    name: "reset-password",
    //meta: { middleware: [guest], layout: "empty" },
    component: () => import("@/views/ResetPassword"),
}, {
    path: "/forgot-password",
    name: "forgot-password",
    //meta: { middleware: [guest], layout: "empty" },
    component: () => import("@/views/ForgotPassword" ),
}, {
    path: "/card",
    name: "card",
    //meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Themes/Card"),
}, {
    path: "/ui-elements",
    name: "ui-elements",
    //meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Themes/UIElements"),
}, {
    path: "/tables",
    name: "tables",
    //meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Themes/Tables"),
}, {
    path: "/forms",
    name: "forms",
    //meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Themes/Forms"),
}, {
    path: "/modal",
    name: "modal",
    //meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Themes/Modal"),
}, {
    path: "/blank",
    name: "blank",
    //meta: { middleware: [auth], layout: "default" },
    component: () => import("@/views/Themes/Blank"),
}, {
    path: "/:catchAll(.*)",
    name: "notfound",
    component: () => import("@/views/NotFound"),
}*/]

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
