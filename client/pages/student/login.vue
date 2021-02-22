<template>
  <v-main class="indigo lighten-5">
    <v-container class="justify-center">
      <v-layout>
        <v-row>
          <v-col align="center" justify="space-around">
            <v-card class="rounded-lg justify-center" width="500">
              <v-card-title>
                <div class="display-1">
                  Student Login
                </div>
              </v-card-title>
              <v-container>
                <v-row
                  ><v-alert
                    class="ml-3"
                    :value="error"
                    outlined
                    dense
                    type="error"
                    color="red"
                  >
                    Email or Password is wrong!
                  </v-alert></v-row
                >
                <form @submit.prevent="submitForm">
                  <v-card-text>
                    <v-row>
                      <v-col align="center">
                        <v-text-field
                          label="email"
                          :rules="emailRules"
                          v-model="email"
                          prepend-icon="face"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col align="center">
                        <v-text-field
                          counter
                          prepend-icon="vpn_key"
                          type="password"
                          :rules="passwordRules"
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
                              class="mt-5 "
                              align="right"
                              color="info"
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
                </form>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
// import Cookie from "js-cookie";

export default {
  layout: "login",
  data() {
    return {
      email: "",
      password: "",
      value: true,
      error: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
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
    activeUser: {
      get() {
        return this.$store.state.user.activeUser;
      },
      set(activeUserObj) {
        this.$store.commit("user/SET_ACTIVEUSER", activeUserObj);
      }
    },
    flag: {
      get() {
        return this.$store.state.general.flag;
      },
      set(flag) {
        this.$store.commit("general/SET_FLAG", flag);
      }
    },
    validRecord() {
      let status = false;
      const validEmail = this.email && /.+@.+/.test(this.email);
      const validPassword = this.password;

      if (validPassword && validEmail) {
        status = true;
      }
      return status;
    }
  },
  methods: {
    submitForm() {},
    back() {
      this.$router.go(-1);
    },
    async login() {
      const res = await axios.post("http://localhost:3000/student/login", {
        email: this.email,
        password: this.password
      });
      if (res.data) {
        if (res.data.flag) {
          this.error = res.data.flag;
        }

        this.activeUser = res.data.user;
        const encryptedUser = this.$encrypt(JSON.stringify(res.data.user));
        // localStorage.setItem("activeUser", encryptedUser);
        this.$setCookie("activeUser", encryptedUser);

        const token = res.data.token ? res.data.token : null;
        if (token) {
          this.$router.push("/student/home/");
          // localStorage.setItem("token", token);
          this.$setCookie("token", token);
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          this.isLoggedIn = true;
          this.flag = "profile";
        }
      }
    }
  }
};
</script>
