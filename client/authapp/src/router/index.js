import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/login.vue";
import Register from "../views/register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/",
    name: "login",
    component: Login //() => import("../views/login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: Register //() => import("../views/register.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  //base: "https://projeto4valormar-iarkc.run-eu-central1.goorm.io",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
