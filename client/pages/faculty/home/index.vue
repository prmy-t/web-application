<template>
  <v-main class="indigo lighten-5">
    <v-container class="ml-1">
      <v-row>
        <SIDEBAR :badge="badge" />

        <v-col md="2">
          <v-sheet class="ml-8" width="1100" rounded="lg">
            <PROFILE v-if="flag === 'profile'" />
            <SCHEDULES v-if="flag === 'schedule'" :schedules="schedules" />

            <!-- <RESULTMENU v-if="flag === 'result'" /> -->
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import SIDEBAR from "@/components/user/sideBar";
import PROFILE from "@/components/user/profile";
import SCHEDULES from "@/components/user/schedules";
import RESULTMENU from "@/components/user/resultMenu";
import RESULTCARD from "@/components/user/resultCard";
export default {
  components: { SIDEBAR, PROFILE, SCHEDULES, RESULTMENU, RESULTCARD },
  data() {
    return {
      model: "",
      schedules: [],
      badge: 0
    };
  },
  mounted() {
    // this.reVerify();
    this.getScheduleList();
  },
  methods: {
    // reVerify() {
    //   const decryptedUser = myCrypto.decrypt(this.$getCookie("activeUser"));
    //   if (!this.activeUser.hasOwnProperty("email")) {
    //     this.activeUser = decryptedUser;
    //     console.log("default: " + this.activeUser._id);
    //   }
    // },
    async getScheduleList() {
      this.$store.dispatch("auth/reVerify");
      const id = this.activeUser._id;
      console.log("user: " + this.activeUser._id);

      const res = await axios.post(
        "http://localhost:3000/faculty/home/getschedulelist",
        { id }
      );

      if (res.data) {
        console.log(res.data);
        // this.schedules = res.data;
        // this.badge = this.schedules.length;
      }
    }
  },
  computed: {
    flag: {
      get() {
        return this.$store.state.general.flag;
      },
      set(flag) {
        this.$store.commit("general/SET_FLAG", flag);
      }
    },
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
    }
  }
};
</script>
