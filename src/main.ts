import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
// import Axios from "axios";

// import axios from "./plugins/axios";

Vue.config.productionTip = false;

/* const baseApiUrl = Axios.create({
  baseURL: "http://localhost:4000/api/v1"
});

Vue.prototype.$http = baseApiUrl; */

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
