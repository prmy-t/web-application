<template>
  <v-stepper v-model="step">
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card v-if="schedules.length">
          <v-card-title
            ><v-icon color="primary" left large>star</v-icon> Available
            Schedules for
            {{ activeUser.firstName + " " + activeUser.lastName }}
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                cols="6"
                v-for="(schedule, index) in schedules"
                :key="index"
              >
                <v-card
                  rounded="lg"
                  class=" mr-1 ml-3"
                  height="200"
                  width="auto"
                >
                  <v-row>
                    <v-col cols="8">
                      <v-card-title class="font-weight-bold text-h5">
                        {{ schedule.title }}</v-card-title
                      >
                      <v-card-subtitle>
                        <p class="text-subtitle-1">
                          Branch: {{ schedule.branch }} | Sem:
                          {{ schedule.sem }}
                        </p></v-card-subtitle
                      ></v-col
                    >
                    <v-col class="ml-5">
                      <v-btn
                        text
                        @click="detailsPage(schedule)"
                        color="primary"
                      >
                        Details
                        <v-icon>arrow_right </v-icon>
                      </v-btn>
                    </v-col></v-row
                  >
                  <v-divider class="mr-1 ml-1"></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="getAdmitCard(schedule._id)" color="primary">
                      <v-icon left>credit_card</v-icon>
                      Get AdmitCard
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card height="600" v-else-if="schedules.length <= 0">
          <v-container>
            <p class="text-h5" align="center">
              <v-icon large left>sentiment_very_dissatisfied </v-icon>
              No Schedules found
            </p>
          </v-container>
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card>
          <v-row>
            <v-col>
              <v-btn @click="step = 1" color="primary" text
                ><v-icon>arrow_left</v-icon>Back</v-btn
              >
            </v-col>
          </v-row>

          <v-divider></v-divider>
          <v-card-title class="text-h4"
            ><v-icon color="primary" left large>star</v-icon>
            {{ scheduleData.title }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text v-if="result">
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
                <v-card color="#DBEDFF" width="240" height="auto" lg="rounded">
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
                        <h2>
                          {{ result.startTime[i] }} to {{ result.endTime[i] }}
                        </h2>
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
        <!-- <v-container v-if="schedule.instruction">
          <v-row class="text-h6">
            <v-col> <v-icon left>campaign</v-icon> Instructions</v-col>
          </v-row>
          <v-textarea
            readonly
            class="pa-2"
            auto-grow
            solo
            v-model="schedule.instruction"
          ></v-textarea>
        </v-container> -->
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import axios from "axios";

export default {
  props: {
    schedules: Array
  },
  data() {
    return {
      step: 1,
      detailsDialog: false,
      generated: false,
      generatedId: String,
      scheduleData: {},
      result: []
    };
  },
  mounted() {},
  computed: {
    roomNo() {
      if (this.result.examId) {
        let id = parseInt(this.result.examId.substring(6, 9));
        let room =
          id % this.scheduleData.rooms === 0
            ? id / this.scheduleData.rooms
            : id / this.scheduleData.rooms + 1;
        return room;
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
    },
    async detailsPage(schedule) {
      this.scheduleData = schedule;
      // this.flag = "scheduleDetails";
      this.step = 2;
      console.log(this.scheduleData + " " + this.step);
      this.resultFinder();
    },
    // async examIdStatus() {
    //   if (this.activeUser.examId == null) this.generated = false;
    //   else this.generated = true;
    // console.log(this.generated);
    // },
    async getAdmitCard(id) {
      const scheduleId = id;
      const userId = this.activeUser._id;

      const res = axios.post("http://localhost:3000/student/getadmitcard", {
        userId,
        scheduleId
      });
      // if (res) console.log(res.data);
    }
  }
};
</script>
