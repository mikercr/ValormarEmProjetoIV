import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/login.vue";
import Register from "../views/register.vue";
import Operador from "../views/Operador.vue";
import Users from "../views/Users.vue";
import Evento from "../views/Evento.vue";
import Produto from "../views/Produto.vue";
import TipoEvento from "../views/TipoEvento.vue";

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
  },
	{
		path: "/operador",
		name: "operador",
		component: Operador //() => import("../views/operador.vue")
	},
  {
		path: "/users",
		name: "users",
		component: Users //() => import("../views/Users.vue")
	},
  {
    path: "/evento",
    name: "evento",
    component: Evento //() => import("../views/Evento.vue")
  },
  {
    path: "/produto",
    name: "produto",
    component: Produto //() => import("../views/Produto.vue")
  },
  {
    path: "/tipoEvento",
    name: "tipoEvento",
    component: TipoEvento //() => import("../views/TipoEvento.vue")
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