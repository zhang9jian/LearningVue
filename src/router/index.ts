import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/Main.vue"),
    redirect:"/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/home/Home.vue"),
      },
      {
        path: "/user",
        name: "user",
        component: () => import("../views/user/User.vue"),
      },
      {
        path: "/pageone",
        name: "page1",
        component: () => import("../views/Page1.vue"),
      },
      {
        path: "/pagetwo",
        name: "page2",
        component: () => import("../views/Page2.vue"),
      },
    ],
  },
];

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router