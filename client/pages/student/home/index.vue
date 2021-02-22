<template>
  <v-main class="indigo lighten-5">
    <v-container class="ml-1">
      <v-row>
        <SIDEBAR :badge="badge" @refresh="refresh" />
        <v-col md="2">
          <v-sheet class="ml-8" width="1100" rounded="lg">
            <PROFILE v-if="flag === 'profile'" />
            <SCHEDULES
              v-if="flag === 'schedule'"
              :schedules="schedules"
              @dataPass="scheduleDataPass"
            />
            <!-- <SCHEDULEDETAILS
              v-if="flag === 'scheduleDetails'"
              :scheduleData="scheduleData"
            /> -->
            <RESULTMENU @dataPass="dataPass" v-if="flag === 'result'" />
          </v-sheet>
          <v-sheet class="ml-8 mt-2" width="1100" rounded="lg">
            <RESULTCARD
              v-if="resultTitle && flag === 'result'"
              :resultData="resultData"
              :title="resultTitle"
            />
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
import SCHEDULEDETAILS from "@/components/user/scheduleDetails";
import RESULTMENU from "@/components/user/resultMenu";
import RESULTCARD from "@/components/user/resultCard";
export default {
  components: {
    SIDEBAR,
    PROFILE,
    SCHEDULES,
    SCHEDULEDETAILS,
    RESULTMENU,
    RESULTCARD
  },
  data() {
    return {
      model: "",
      schedules: [],
      badge: 0,
      resultData: [],
      resultTitle: null,
      scheduleData: {}
    };
  },
  mounted() {
    this.getScheduleList();
  },
  methods: {
    async getScheduleList() {
      this.$store.dispatch("auth/reVerify");

      const branch = this.activeUser.branch;
      const sem = this.activeUser.sem;
      const userId = this.activeUser._id;
      const res = await axios.post(
        "http://localhost:3000/student/home/getschedulelist",
        { branch, sem, userId }
      );

      if (res.data) {
        this.schedules = res.data;
        this.badge = this.schedules.length;
      }
    },
    dataPass(data, title) {
      this.resultData = data;
      this.resultTitle = title;
    },
    scheduleDataPass(data) {
      this.scheduleData = data;
    },
    refresh() {
      this.resultData = [];
      this.resultTitle = null;
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
