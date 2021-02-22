<template>
  <v-card>
    <v-card-title></v-card-title>
    <v-card-text>
      <v-container>
        <v-row align="end">
          <v-col cols="4">
            <v-select
              prepend-icon="engineering"
              :items="sems"
              v-model="sem"
              label="Select Semester"
              @change="findSchedule"
            ></v-select>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="4">
            <v-select
              :disabled="scheduleArray.length === 0"
              prepend-icon="engineering"
              :items="scheduleTitles"
              label="Select Exam"
              v-model="selectedTitle"
            ></v-select>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-btn @click="getResult" class="mb-5">show result</v-btn>
          </v-col>
        </v-row>
        <v-row></v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";

import admin from "../../layouts/admin.vue";
export default {
  components: { admin },
  mounted() {},
  props: {
    btn: String
  },
  data() {
    return {
      sem: Number,
      sems: [1, 2, 3, 4, 5, 6, 7, 8],
      scheduleArray: [],
      scheduleTitles: [],
      scheduleIds: [],
      selectedTitle: String
    };
  },
  computed: {
    activeUser: {
      get() {
        return this.$store.state.user.activeUser;
      },

      set(activeUserObj) {
        this.$store.commit("user/SET_ACTIVEUSER", activeUserObj);
      }
    }
  },
  methods: {
    getIn(index) {
      this.titleIndex = this.scheduleTitles.indexOf(index);
    },
    async findSchedule(sem) {
      const branch = this.activeUser.branch;
      const userId = this.activeUser._id;
      const res = await axios.post(
        "http://localhost:3000/student/result/getschedulelist",
        { sem, branch, userId }
      );
      if (res) {
        this.scheduleArray = res.data;
        let array = res.data;
        for (let i in array) {
          this.scheduleTitles.push(array[i].title);
          this.scheduleIds.push(array[i]._id);
        }
      }
    },
    async getResult() {
      let scheduleId = this.scheduleIds[
        this.scheduleTitles.indexOf(this.selectedTitle)
      ];

      let userEmail = this.activeUser.email;
      const res = await axios.post(
        "http://localhost:3000/student/result/getresult",
        { scheduleId, userEmail }
      );
      if (res) {
        this.$emit("dataPass", res.data, this.selectedTitle);
      }
    }
  }
};
</script>
