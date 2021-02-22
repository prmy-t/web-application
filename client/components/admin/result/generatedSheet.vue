<template>
  <v-card>
    <v-container>
      <v-card>
        <v-container>
          <div class="text-h4">
            {{ title }}
          </div>
          <div class="mt-2">Total Students: {{ sheetData.length }}</div>
        </v-container>

        <v-container>
          <v-card v-for="i in rooms" :key="i" class="blue lighten-5 mb-2">
            <v-card-title> Room: {{ i }} </v-card-title>
            <v-container>
              <v-card
                class="ma-2"
                v-for="index in parseInt(
                  `${
                    i === rooms && sheetData.length % capacity != 0
                      ? sheetData.length % capacity
                      : capacity
                  }`
                )"
                :key="index"
              >
                <v-row>
                  <v-col class="" cols="3"
                    ><v-card-title
                      >{{ sheetData[index - 1 + (i - 1) * capacity].firstName }}
                      {{ sheetData[index - 1 + (i - 1) * capacity].lastName }}
                    </v-card-title>
                    <v-card-subtitle>
                      <div
                        v-if="sheetData[index - 1 + (i - 1) * capacity].examId"
                      >
                        Exam Id:{{
                          sheetData[index - 1 + (i - 1) * capacity].examId
                        }}
                      </div>
                      <div
                        v-if="!sheetData[index - 1 + (i - 1) * capacity].examId"
                      >
                        Exam Id not Generated
                      </div>
                    </v-card-subtitle>
                  </v-col>

                  <v-col
                    class="mt-5 ml-2"
                    cols="2"
                    v-for="sub in Object.keys(
                      sheetData[index - 1 + (i - 1) * capacity].subjects
                    )"
                    :key="sub"
                  >
                    <v-text-field
                      :label="sub"
                      v-model="
                        sheetData[index - 1 + (i - 1) * capacity]['subjects'][
                          sub
                        ]
                      "
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
            </v-container>
          </v-card>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="saveData" color="primary">Save data </v-btn>
          </v-card-actions>
          <v-snackbar v-model="snackbar" color="green darken-1" :timeout="2000">
            Data Saved !
            <template v-slot:action="{ attrs }">
              <v-btn text dark v-bind="attrs" @click="snackbar = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-container>
      </v-card>
    </v-container>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  props: {
    sheetData: {},
    semData: Number,
    rooms: Number,
    title: String,
    id: String,
    capacity: Number
  },
  data() {
    return {
      num: -1,
      startingValue: Number,
      snackbar: false,
      sem: Number,
      branch: String,
      branches: ["CSE", "ME", "CE", "EC"],
      sems: [1, 2, 3, 4, 5, 6, 7, 8]
    };
  },
  // computed: {
  //   flag: {
  //     get() {
  //       return this.$store.state.general.flag;
  //     },
  //     set(flag) {
  //       this.$store.commit("general/SET_FLAG", flag);
  //     }
  //   }
  // },
  mounted() {},
  methods: {
    async saveData() {
      let resultData = this.sheetData;
      let cgpa = null;
      for (let student in resultData) {
        let total = null;
        let sum = null;
        let backLog = 0;
        total = Object.values(resultData[student].subjects);
        for (let i in total) {
          if (total[i] < 40) backLog++;
        }
        sum = total.reduce(function(a, b) {
          return parseInt(a) + parseInt(b);
        }, 0);
        cgpa = (sum / total.length / 10).toFixed(1);
        resultData[student]["cgpa"] = cgpa;
        resultData[student]["backLog"] = backLog;
      }
      console.log(resultData);
      let id = this.id;
      const res = await axios.post(
        "http://localhost:3000/admin/home/saveresultdata",
        { resultData, id }
      );
      if (res) {
        this.snackbar = true;
      }
    }
  }
};
</script>
