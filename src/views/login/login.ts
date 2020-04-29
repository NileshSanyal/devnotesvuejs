// import Vue from "vue";

import { VForm } from "../../../types/vform";

import Vue from "../../plugins/axios";

export default Vue.extend({
  data: () => ({
    show2: true,
    response: {},
    email: "",
    password: "",
    userValid: true,
    loginUsrSnackBar: false,
    loginUsrErrorMsg: "",
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
    form(): VForm {
      return this.$refs.userLoginForm as VForm;
    }
  },
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    async loginUser() {
      try {
        if (this.form.validate()) {
          const email = this.email;
          const password = this.password;

          this.response = await this.axios.post("/users/login", {
            email: email,
            password: password
          });

          if (this.response.data.error) {
            this.loginUsrSnackBar = true;
            this.loginUsrErrorMsg = this.response.data.message;
          } else {
            const token = this.response.data.token;
            localStorage.setItem("token", token);
            const userid = this.response.data.userid;
            localStorage.setItem("userid", userid);

            if (localStorage.getItem("token") != null) {
              this.$router.push("/dashboard");
            }
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
