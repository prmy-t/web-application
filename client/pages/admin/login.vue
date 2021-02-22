<template>
  <v-main>
    <v-container class="justify-center">
      <v-row>
        <v-col align="center" justify="space-around">
          <v-card class=" justify-center" width="500">
            <v-card-title>
              <div class="display-1">
                Admin Login
              </div>
            </v-card-title>
            <!-- <form @submit.prevent="submitForm"> -->
            <v-card-text>
              <v-row
                ><v-alert
                  class="ml-3"
                  :value="flag"
                  outlined
                  dense
                  type="error"
                  color="red"
                >
                  Email or Password is wrong!
                </v-alert></v-row
              >
              <v-row>
                <v-col align="center">
                  <v-text-field
                    label="Email"
                    :rules="emailRules"
                    v-model="email"
                    prepend-icon="admin_panel_settings"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col align="center">
                  <v-text-field
                    :rules="passwordRules"
                    prepend-icon="vpn_key"
                    type="password"
                    label="password"
                    v-model="password"
                    :append-icon="value ? 'visibility_off' : 'visibility'"
                    @click:append="() => (value = !value)"
                    :type="value ? 'password' : 'text'"
                  >
                  </v-text-field>

                  <v-col cols="12">
                    <v-row class="mt-6">
                      <v-btn
                        outlined
                        color="error"
                        align="right"
                        class="mt-5"
                        @click="back"
                      >
                        Back
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn
                        align="right"
                        color="info"
                        class="mt-5"
                        type="submit"
                        :disabled="!validRecord"
                        @click="login"
                      >
                        Login
                      </v-btn>
                    </v-row>
                  </v-col>
                </v-col>
              </v-row>
            </v-card-text>
            <!-- </form> -->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";

export default {
  layout: "login",
  data() {
    return {
      email: "",
      password: "",
      flag: false,
      value: true,
      emailRules: [v => !!v || "email is required"],
      passwordRules: [v => !!v || "Password is required"]
    };
  },
  computed: {
    isLoggedIn: {
      get() {
        return this.$store.state.auth.isLoggedIn;
      },
      set(status) {
        this.$store.commit("auth/SET_IS_LOGGEDIN", status);
      }
    },

    validRecord() {
      let status = false;
      const validEmail = this.email;
      const validPassword = this.password.length;

      if (validPassword >= 5 && validEmail) {
        status = true;
      }
      return status;
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    async login() {
      const res = await axios.post("http://localhost:3000/admin/login", {
        email: this.email,
        password: this.password
      });
      if (res) {
        if (res.data.flag) {
          this.flag = res.data.flag;
        }
        this.activeUser = res.data.user;
        const token = res.data.token ? res.data.token : null;
        if (token) {
          this.$router.push("/admin/home/list");
          // localStorage.setItem("token", token);
          this.$setCookie("token", token);
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          this.isLoggedIn = true;
        }
      }
    }
  }
};
</script>
