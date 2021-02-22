<template>
  <v-app id="inspire">
    <v-app-bar dark app flat color="indigo darken-2">
      <v-avatar class="mr-10" color="grey darken-1" size="32">
        <!-- <img
          alt="Avatar"
          src="https://www.freepik.com/free-icon/study-lamp_769885.htm#page=1&query=exam&position=9"
        /> -->
      </v-avatar>
      <v-toolbar-title>Examination Management System</v-toolbar-title>
      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab @click="list">
            <v-icon left>list</v-icon>
            List
          </v-tab>
          <v-tab @click="schedule">
            <v-icon left>schedule</v-icon>
            Schedule</v-tab
          >
          <v-tab @click="result">
            <v-icon left>description</v-icon>
            Result</v-tab
          >
          <v-tabs-slider color="white"></v-tabs-slider>
        </v-tabs>
      </template>
    </v-app-bar>
    <nuxt />
    <Footer />
  </v-app>
</template>

<script>
import Footer from "@/components/footer";

export default {
  components: { Footer },
  data() {
    return {
      items: ["List", "Schedule"]
    };
  },
  mounted() {
    this.reVerify();
  },
  methods: {
    login() {
      this.$router.push("/login");
    },

    list() {
      this.$router.push("/admin/home/list");
    },
    schedule() {
      this.$router.push("/admin/home/schedule/schedules");
    },
    result() {
      this.$router.push("/admin/home/result");
    },

    reVerify() {
      this.$store.dispatch("auth/reVerify");
    }
  },
  computed: {
    isLoggedIn: {
      get() {
        return this.$store.state.auth.isLoggedIn;
      },
      set(status) {
        this.$store.commit("auth/SET_IS_LOGGEDIN", status);
      }
    }
  }
};
</script>
<style>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>
