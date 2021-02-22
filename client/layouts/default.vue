<template>
  <v-app id="inspire">
    <v-app-bar dark app flat color="indigo darken-2">
      <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>
      <v-toolbar-title>Examintation Management System</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <nuxt />
    <Footer />
  </v-app>
</template>

<script>
import Footer from "@/components/footer";
export default {
  components: { Footer },

  beforeMount() {
    this.reVerify();
  },
  methods: {
    login() {
      this.$router.push("/login");
    },

    reVerify() {
      const decryptedUser = this.$decrypt(this.$getCookie("activeUser"));

      if (!this.activeUser.hasOwnProperty("email")) {
        this.activeUser = decryptedUser;
      }
    }
  },
  computed: {
    isLoggedin: {
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
    }
  }
};
</script>
