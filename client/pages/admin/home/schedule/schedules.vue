<template>
  <v-main class="indigo lighten-5">
    <v-container class="ml-1">
      <v-row>
        <SIDEBAR :flag="flag" btn1="Schedules" btn2="Add Schedule" />

        <!-- Schedule List -->
        <v-col cols="8">
          <v-sheet
            v-if="flag == 'schedule'"
            class="ml-8"
            width="1100"
            height="auto"
            rounded="lg"
          >
            <SCHEDULES @refresh="getScheduleList" />
          </v-sheet>
          <!-- Add Schedule -->
          <v-sheet
            v-if="flag == 'addSchedule'"
            class="ml-8"
            width="1050"
            height="auto"
            rounded="lg"
          >
            <SCHEDULEFORM @refresh="getScheduleList" />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import SIDEBAR from "@/components/admin/sideBar";
import SCHEDULES from "@/components/admin/schedule/schedules";
import SCHEDULEFORM from "@/components/admin/schedule/scheduleForm";
export default {
  layout: "admin",
  components: { SIDEBAR, SCHEDULES, SCHEDULEFORM },
  data() {
    return {};
  },

  mounted() {
    this.getScheduleList();
  },
  computed: {
    flag: {
      get() {
        return this.$store.state.general.flag;
      },
      set(flag) {
        this.$store.commit("general/SET_FLAG", flag);
      }
    }
  },
  methods: {
    async getScheduleList() {
      const res = await axios.get(
        "http://localhost:3000/admin/home/getschedulelist"
      );
      if (res.data) {
        this.schedules = res.data;
        this.flag = "schedule";
      }
    }
  }
};
</script>
