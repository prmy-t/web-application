<template>
  <!-- SIDE_BAR_SHEET -->
  <v-main class="indigo lighten-5">
    <v-container class="ml-1">
      <v-row>
        <SIDEBAR btn1="Student List" btn2="Faculty List" />

        <!-- MAIN_SHEET -->
        <v-col md="10" lg="10">
          <v-sheet class="ml-8" width="1190" height="auto" rounded="lg">
            <PROFILE v-if="flag === 'profile'" />
            <STUDENTTABLE v-if="flag === 'student'" />
            <FACULTYTABLE v-if="flag === 'faculty'" />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import SIDEBAR from "@/components/admin/sideBar";
import STUDENTTABLE from "@/components/admin/list/studentTable";
import FACULTYTABLE from "@/components/admin/list/facultyTable";
export default {
  layout: "admin",
  components: { SIDEBAR, STUDENTTABLE, FACULTYTABLE },
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
  mounted() {
    this.flagValue();
  },
  methods: {
    flagValue() {
      this.flag = "student";
    }
  }
};
</script>
