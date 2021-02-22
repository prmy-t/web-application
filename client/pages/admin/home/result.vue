<template>
  <v-main class="indigo lighten-5">
    <v-container class="ml-1">
      <v-row>
        <SIDEBAR
          btn1="Result Sheets"
          btn2="Edit Sheets"
          @refresh="resetValues"
        />
        <v-col md="2">
          <!-- RESULT SHEET -->
          <div v-if="flag === 'resultSheets'">
            <v-sheet class="ml-8" width="1100" height="auto" rounded="lg">
              <GENERATEMENU
                cardTitle="Get Sheet"
                btn="Get Sheet"
                @dataPass="getSheet"
              />
            </v-sheet>
            <v-sheet class="ml-8 mt-2" width="1100" height="auto" rounded="lg">
              <GETSHEET
                v-if="resultData.length > 0"
                :sheetData="resultData"
                :headerText="headerText"
                :title="scheduleTitle"
              />
            </v-sheet>
          </div>

          <!-- EDIT SHEET -->
          <div v-if="flag === 'editSheets'">
            <v-sheet class="ml-8" width="1100" height="auto" rounded="lg">
              <GENERATEMENU
                cardTitle="Generate Sheet"
                btn="Generate Sheet"
                @dataPass="generateSheet"
              />
            </v-sheet>
            <v-sheet class="ml-8 mt-2" width="1100" height="auto" rounded="lg">
              <GENERATEDSHEET
                v-if="displayData.length > 0"
                :sheetData="displayData"
                :semData="semData"
                :title="scheduleTitle"
                :id="scheduleId"
                :rooms="rooms"
                :capacity="capacity"
              />
            </v-sheet>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import SIDEBAR from "@/components/admin/sideBar";
import GENERATEMENU from "@/components/admin/result/generateMenu";
import GETSHEET from "@/components/admin/result/getSheet";
import GENERATEDSHEET from "@/components/admin/result/generatedSheet";
export default {
  layout: "admin",
  components: { SIDEBAR, GENERATEMENU, GETSHEET, GENERATEDSHEET },
  data() {
    return {
      model: 1,
      sheetData: [],
      displayData: [],
      scheduleTitle: "",
      scheduleId: String,
      rooms: Number,
      capacity: Number,
      headerText: [],
      resultData: [],
      semData: Number,
      objectKeys: [],
      search: ""
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
  mounted() {
    this.flagValue();
  },
  methods: {
    resetValues() {
      this.displayData = [];
      this.semData = null;
      this.scheduleTitle = null;
      this.scheduleId = null;
    },
    flagValue() {
      this.flag = "resultSheets";
    },
    getSheet(data, sem, title) {
      this.scheduleTitle = title;
      let students = data.students;
      this.resultData = [];
      for (let i in students) {
        let subjects = students[i]["subjects"];
        let student = {};
        let j = 0;
        student.firstName = students[i].firstName;
        student.lastName = students[i].lastName;
        student.examId = students[i].examId;
        this.headerText = Object.keys(students[i]["subjects"]);
        student.subjects = this.headerText;
        for (let sub in subjects) {
          student[j] = subjects[sub];
          j++;
        }
        console.log(students[i]);
        student.cgpa = students[i].cgpa;
        student.backLog = students[i].backLog;
        this.resultData.push(student);
      }
    },
    generateSheet(data, sem, title, titleId) {
      this.scheduleTitle = title;
      this.scheduleId = titleId;
      this.sheetData = data.students;
      this.displayData = data.students;
      this.rooms = data.rooms;
      this.capacity = data.capacity;
      this.semData = sem;
    }

    // sortById() {
    //   let arr = [];
    //   this.displayData = [];
    //   for (var j in this.sheetData) {
    //     arr.push(this.sheetData[j].firstName);
    //   }
    //   arr.sort();
    //   for (var p in arr) {
    //     for (var q in this.sheetData)
    //       if (arr[p] == this.sheetData[q].firstName) {
    //         this.displayData.push(this.sheetData[q]);
    //       }
    //   }
    // }
  }
};
</script>
