<template>
  <v-card>
    <v-card-title
      ><v-icon left>content_paste </v-icon>{{ cardTitle }}</v-card-title
    >
    <v-card-text>
      <v-container>
        <v-row align="end">
          <v-col cols="4">
            <v-select
              prepend-icon="engineering"
              :items="branches"
              label="Select Branch"
              v-model="branch"
              required
            ></v-select>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="4">
            <v-select
              prepend-icon="engineering"
              :items="sems"
              label="Select Semester"
              v-model="sem"
              required
            ></v-select>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-btn @click="findSchedule" class="mb-5">
              Find schedules
            </v-btn>
          </v-col>
        </v-row>
        <v-row align="end" v-if="row2 === true && titles.length > 0">
          <v-col cols="4">
            <v-select
              prepend-icon="engineering"
              :items="titles"
              label="select Schedule"
              @change="selectedSchedule"
              required
            ></v-select>
          </v-col>

          <v-col>
            <v-btn @click="generateSheet" class="ml-5 mb-5">{{ btn }}</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  props: {
    btn: String,
    cardTitle: String
  },
  data() {
    return {
      sem: Number,
      branch: String,
      row2: false,
      titles: [],
      titlesId: [],
      title: String,
      titleId: String,
      branches: ["CSE", "ME", "CE", "EC"],
      sems: [1, 2, 3, 4, 5, 6, 7, 8]
    };
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
    async findSchedule() {
      let branch = this.branch;
      let sem = this.sem;
      const res = await axios.post(
        " http://localhost:3000/admin/result/findschedule",
        { branch, sem }
      );
      if (res) {
        let schedules = res.data;
        for (let i = 0; i < schedules.length; i++) {
          this.titles.push(schedules[i].title);
          this.titlesId.push(schedules[i]._id);
        }
        this.row2 = true;
      }
    },
    selectedSchedule(title) {
      this.title = title;
      let index = this.titles.indexOf(title);
      this.titleId = this.titlesId[index];
    },
    async generateSheet() {
      let id = this.titleId;
      const res = await axios.post(
        "http://localhost:3000/admin/result/generateresultsheet",
        {
          id
        }
      );
      if (res) {
        let students = res.data.students;
        console.log(students);
        let room = res.data.room;
        let capacity = res.data.capacity;
        let studentArray = [];
        let sortedData = [];
        let arr = [];
        for (let id in students) {
          arr.push(students[id].examId);
        }
        arr.sort();
        for (var x in arr) {
          for (let st in students) {
            if (arr[x] == students[st].examId) {
              studentArray.push(students[st]);
            }
          }
        }
        sortedData["students"] = studentArray;
        sortedData["rooms"] = room;
        sortedData["capacity"] = capacity;
        this.$emit("dataPass", sortedData, this.sem, this.title, this.titleId);
      }
    }
  }
};
</script>
