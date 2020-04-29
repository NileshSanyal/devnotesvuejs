// import Vue from "vue";
import { VForm } from "../../../types/vform";
// import router from "../../router/index";

/* import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000/api/v1";
Vue.prototype.$http = axios; */

import Vue from "../../plugins/axios";

export default Vue.extend({
  data: () => ({
    show2: true,
    response: {},
    userName: "",
    email: "",
    password: "",
    userValid: true,
    registerUsrSnackBar: false,
    registerUsrErrorMsg: "",
    usernameRequired: [(v: boolean) => !!v || "Username is required"],
    emailRequired: [
      (v: boolean) => !!v || "Email is required",
      (v: string) =>
        /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v) || "Email address is invalid"
    ],
    passwordRequired: [
      (v: boolean) => !!v || "Password is required",
      (v: string) =>
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,15}$/.test(
          v
        ) ||
        "Password Must Contain Minimum 5 and Maximum 15 Characters, that includes at least 1 number, 1 special character and 1 alphabet"
    ]
  }),
  computed: {
    // first approach
    /*
    form(): Vue & { validate: () => boolean } {
      return this.$refs.form as Vue & { validate: () => boolean }
    }
    */

    form(): VForm {
      return this.$refs.userRegisterForm as VForm;
    }
  },
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    async registerUser() {
      try {

        if (this.form.validate()) {
          const username = this.userName;
          const email = this.email;
          const password = this.password;

          this.response = await this.axios.post("/users/register", {
            userName: username,
            email: email,
            password: password
          });

          if (this.response.data.error) {
            this.registerUsrSnackBar = true;
            this.registerUsrErrorMsg = this.response.data.message;
          } else {
            this.$router.push("/register");
            this.userName = "";
            this.email = "";
            this.password = "";
            this.registerUsrSnackBar = true;
            this.registerUsrErrorMsg = "User registered successfully";
          }
        }
      } catch (error) {
        console.error(
          "Something went wrong, please try again later" + error.toString()
        );
      }
    }
  }
});
