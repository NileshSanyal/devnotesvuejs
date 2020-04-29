import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(
        /* webpackChunkName: "register" */ "../views/register/register.vue"
      )
  },
  {
    path: "/dashboard",
    name: "home",
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ "../views/dashboard/dashboard.vue"
      ),
    meta: {
      title: "Dashboard",
      requiresAuth: true,
    },
    children: [
      {
        path: "/notes",
        name: "Notes",
        component: () => import(/* webpackChunkName: "notes" */ "../views/notes/notes.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

/* router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("token") == null) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  }
}); */

export default router;
