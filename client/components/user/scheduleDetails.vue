<template>
  <v-card>
    <v-card-title
      ><v-icon color="primary" left large>star</v-icon>
      {{ scheduleData.title }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text v-if="result.examId">
      <v-row>
        <v-col class="text-h5">
          <v-icon small>fiber_manual_record </v-icon>
          Branch:
          {{ activeUser.branch }}
        </v-col>
        <v-col class="text-h5">
          <v-icon small>fiber_manual_record </v-icon>
          Semester:
          {{ result.sem }}
        </v-col>
      </v-row>
      <v-row class="">
        <v-col class="text-h5">
          <v-icon small>fiber_manual_record </v-icon>
          Exam Id:
          {{ result.examId }}
        </v-col>
        <v-col class="text-h5">
          <v-icon small>fiber_manual_record </v-icon>
          Room No:
          {{ roomNo }}
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row justify="center">
        <v-col cols="3" v-for="(index, i) in result.dates" :key="index">
          <v-card color="#FFFef2" width="240" height="auto" lg="rounded">
            <v-card-text align="center">
              <v-row>
                <v-col>
                  <h2>{{ Object.keys(result.subjects)[i] }}</h2>
                  <v-divider class="ml-12 mr-12 mt-1"></v-divider>
                  <h3>03106101</h3>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h4>Date:</h4>
                  <h2>{{ index }}</h2>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h4>Time:</h4>
                  <h2>{{ result.startTime[i] }} to {{ result.endTime[i] }}</h2>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="mt-3">
              <v-spacer></v-spacer>
              <div id="credit">Credits:</div>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  props: {
    scheduleData: {}
  },
  data() {
    return {
      detailsDialog: false,
      generated: false,
      generatedId: String,
      result: []
    };
  },
  mounted() {
    this.resultFinder();
  },
  computed: {
    roomNo() {
      let id = parseInt(this.result.examId.substring(6, 9));
      let room =
        id % this.scheduleData.rooms === 0
          ? id / this.scheduleData.rooms
          : id / this.scheduleData.rooms + 1;
      return room;
    },
    flag: {
      get() {
        return this.$store.state.general.flag;
      },
      set(flag) {
        this.$store.commit("general/SET_FLAG", flag);
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
  },
  methods: {
    resultFinder() {
      let scheduleId = this.scheduleData._id;
      let result = this.activeUser.result;
      for (let index in result) {
        if (result[index].scheduleId === scheduleId) {
          this.result = result[index];
          break;
        }
      }
    }
  }
};
</script>
