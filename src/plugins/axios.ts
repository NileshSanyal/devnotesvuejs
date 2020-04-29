import Vue from "vue";
import axios, { AxiosStatic } from "axios";

// old
// axios.defaults.baseURL = "http://localhost:4000/api/v1";
const token = localStorage.getItem("token");
// new
Vue.use({
  install() {
    Vue.prototype.axios = axios.create({
      baseURL: "http://localhost:4000/api/v1",
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }
});

// old
// Vue.prototype.$http = axios;

declare module "vue/types/vue" {
  interface Vue {
    axios: AxiosStatic;
    pageTitle: string;
  }
}
export default Vue;
