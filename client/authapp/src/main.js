import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import vuetify from './plugins/vuetify'

const base = axios.create({
  baseURL: "https://projeto4valormar-iarkc.run-eu-central1.goorm.io"
});

Vue.prototype.$http = base;
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
