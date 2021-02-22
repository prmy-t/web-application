<template>
  <v-stepper rounded="lg" v-model="step">
    <v-stepper-header>
      <v-stepper-step
        :editable="step > 1"
        :step="step"
        :complete="step > 1"
        step="1"
      >
        Title Details
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :editable="step > 2"
        :step="step"
        :complete="step > 2"
        step="2"
      >
        Date & Subject
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :editable="step > 3"
        :step="step"
        :complete="step > 3"
        step="3"
      >
        Seating Details
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :step="step" :complete="step > 4" step="4">
        OverView
      </v-stepper-step>
    </v-stepper-header>

    <!-- STEP__1 -->
    <!-- {{ scheduleData }} -->
    <v-stepper-content step="1">
      <v-card>
        <v-container>
          <v-card-text class="text-center">
            <v-row justify="center">
              <v-col cols="4">
                <v-text-field
                  prepend-icon="list_alt"
                  justify="space-around"
                  label="Schedule Title"
                  :rules="titleRules"
                  v-model="scheduleData.title"
                  required
                >
                </v-text-field>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="3">
                <v-select
                  prepend-icon="engineering"
                  :items="branches"
                  v-model="scheduleData.branch"
                  label="Select Branch"
                  :rules="branchRules"
                ></v-select>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="3">
                <v-select
                  prepend-icon="format_list_numbered"
                  :items="sems"
                  v-model="scheduleData.sem"
                  label="Select Sem"
                  :rules="semRules"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pr-2" cols="2">
                <p class="text--secondary text-h6">Choose dates :</p>
              </v-col>
              <v-col cols="2">
                <v-date-picker
                  class="ml-5"
                  width="400"
                  :rules="[v => !!v || 'Required']"
                  landscape
                  v-model="scheduleData.dates"
                  multiple
                ></v-date-picker>
              </v-col>
            </v-row>
          </v-card-text>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="pa-6"
            color="indigo darken-2"
            :disabled="!validPage1"
            text
            @click="
              step = 2;
              dates = scheduleData.dates.sort();
            "
          >
            Next
            <v-icon>navigate_next </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-stepper-content>

    <!-- STEP__2 -->
    <v-stepper-content step="2">
      <v-card>
        <v-container>
          <v-card-title class="pt-1">
            <v-icon color="blue darken-2" left large>star </v-icon>
            <div class="display-1">
              {{ scheduleData.title }}
            </div>
            <v-card-subtitle>
              {{ scheduleData.branch }} - semester {{ scheduleData.sem }}
            </v-card-subtitle>
          </v-card-title>
          <v-divider class="my-2"></v-divider>
          <v-col>
            <v-row align="center">
              <v-card
                class="ml-5 mt-3 mb-3"
                v-for="(date, index) in scheduleData.dates"
                width="300"
                height="auto"
                :key="index"
              >
                <v-col clos="3">
                  <v-container>
                    <v-card-title class="justify-center"
                      ><v-icon large left>insert_invitation </v-icon>
                      <div class="text-h5">
                        {{ formateDate(date) }}
                      </div>
                    </v-card-title>
                    <v-card-text class="text-center">
                      <v-row>
                        <v-col cols="11">
                          <v-select
                            prepend-icon="subject"
                            :items="availableSubject[scheduleData.sem - 1]"
                            item-text="text"
                            item-value="text"
                            label="Subject"
                            v-model="scheduleData.subjects[index]"
                            :rules="subjectRules"
                          ></v-select> </v-col
                      ></v-row>
                      <v-row>
                        <v-col cols="11">
                          <v-menu
                            ref="Smenu"
                            v-model="startMenu[index]"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="scheduleData.startTime[index]"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="scheduleData.startTime[index]"
                                label="Pick Starting Time"
                                prepend-icon="mdi-clock-time-four-outline"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              ampm-in-title
                              v-if="startMenu[index]"
                              v-model="scheduleData.startTime[index]"
                              :max="scheduleData.endTime[index]"
                              @click:minute="
                                $refs.Smenu[index].save(
                                  scheduleData.startTime[index]
                                )
                              "
                            ></v-time-picker> </v-menu></v-col
                      ></v-row>
                      <v-row>
                        <v-col cols="11">
                          <v-menu
                            ref="Emenu"
                            v-model="endMenu[index]"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="scheduleData.endTime[index]"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="scheduleData.endTime[index]"
                                label="Pick Ending Time"
                                prepend-icon="mdi-clock-time-four-outline"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              ampm-in-title
                              v-if="endMenu[index]"
                              v-model="scheduleData.endTime[index]"
                              :min="scheduleData.startTime[index]"
                              full-width
                              @click:minute="
                                $refs.Emenu[index].save(
                                  scheduleData.endTime[index]
                                )
                              "
                            ></v-time-picker> </v-menu></v-col
                      ></v-row>
                    </v-card-text>
                  </v-container>
                </v-col>
              </v-card>
            </v-row>
          </v-col>
        </v-container>
        <v-card-actions>
          <v-btn class="pa-6" color="indigo darken-2" @click="step = 1" text>
            <v-icon>navigate_before </v-icon>
            Previous
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="pa-6"
            color="indigo darken-2"
            :disabled="!validPage2"
            @click="step = 3"
            text
          >
            Next
            <v-icon>navigate_next </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-stepper-content>

    <!-- STEP__3 -->
    <v-stepper-content step="3">
      <v-card>
        <v-container>
          <v-row justify="center">
            <v-col cols="5">
              <v-card>
                <v-container>
                  <v-dialog v-model="ssDialog" persistent max-width="700px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-col>
                        <v-row>
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            @click="getStudentList"
                            ><v-icon left>face</v-icon> SELECT STUDENTS</v-btn
                          >
                        </v-row>
                        <v-row class="mt-2">
                          {{ scheduleData.selectedStudents.length }} Students
                          Selected
                        </v-row>
                      </v-col>
                    </template>

                    <v-card class="pt-2 pb-2 pl-3 pr-3">
                      <v-card-title>
                        <div class="display-1">
                          select Student
                        </div>
                      </v-card-title>
                      <v-data-table
                        v-model="scheduleData.selectedStudents"
                        :headers="headers"
                        :items="students"
                        :items-per-page="5"
                        class="elevation-1"
                        :search="search"
                        show-select
                        item-key="email"
                      >
                      </v-data-table>
                      <v-col cols="12">
                        <v-row>
                          <v-btn
                            outlined
                            color="error"
                            align="right"
                            class="mt-5"
                            @click="ssDialog = false"
                          >
                            Cancle
                          </v-btn>
                          <v-spacer></v-spacer>
                          <v-btn
                            align="right"
                            color="info"
                            class="mt-5"
                            type="submit"
                            :disabled="!scheduleData.selectedStudents[0]"
                            @click="ssDialog = false"
                          >
                            Done
                          </v-btn>
                        </v-row>
                      </v-col>
                    </v-card>
                  </v-dialog>
                  <v-card-text class="text-center"> </v-card-text>
                </v-container>
              </v-card>
            </v-col>
            <v-col cols="5">
              <v-card>
                <v-container>
                  <v-dialog v-model="sfDialog" persistent max-width="700px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-col>
                        <v-row>
                          <v-btn v-bind="attrs" v-on="on">
                            <v-icon left>account_box</v-icon>
                            SELECT Faculty</v-btn
                          >
                        </v-row>
                        <v-row class="mt-2">
                          {{ scheduleData.selectedFaculties.length }} Faculties
                          Selected
                        </v-row>
                      </v-col>
                    </template>

                    <v-card class="pt-2 pb-2 pl-3 pr-3">
                      <v-card-title>
                        <div class="display-1">
                          select faculty
                        </div>
                      </v-card-title>
                      <v-data-table
                        v-model="scheduleData.selectedFaculties"
                        :headers="Fheaders"
                        :items="faculties"
                        :items-per-page="5"
                        class="elevation-1"
                        :search="search"
                        show-select
                        item-key="email"
                      >
                      </v-data-table>
                      <v-col cols="12">
                        <v-row>
                          <v-btn
                            outlined
                            color="error"
                            align="right"
                            class="mt-5"
                            @click="sfDialog = false"
                          >
                            Cancle
                          </v-btn>
                          <v-spacer></v-spacer>
                          <v-btn
                            align="right"
                            color="info"
                            class="mt-5"
                            type="submit"
                            :disabled="!scheduleData.selectedFaculties[0]"
                            @click="sfDialog = false"
                          >
                            Done
                          </v-btn>
                        </v-row>
                      </v-col>
                    </v-card>
                  </v-dialog>
                  <v-card-text class="text-center"> </v-card-text>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="10">
              <v-card height="auto" width="auto">
                <v-container>
                  <v-row align="center">
                    <v-col cols="8">
                      <v-text-field
                        prepend-icon="weekend"
                        type="number"
                        label="Type Available Rooms"
                        :rules="roomRules"
                        v-model.number="scheduleData.rooms"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
            <!-- <v-col cols="5">
              <v-card height="auto">
                <v-container>
                  <v-row>
                    <v-col cols="8">
                      <v-text-field
                        prepend-icon="airline_seat_recline_normal"
                        type="number"
                        label="Maximum Strength of One Room"
                        :rules="roomRules"
                        v-model.number="scheduleData.singleStrength"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col> -->
          </v-row>
          <v-row justify="center">
            <v-col cols="5">
              <v-card height="auto" width="auto">
                <v-container>
                  <v-row align="center">
                    <v-col cols="8">
                      <v-text-field
                        prepend-icon="compare_arrows"
                        type="number"
                        label="Width of Rooms"
                        :rules="roomRules"
                        v-model.number="scheduleData.roomWidth"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
            <v-col cols="5">
              <v-card height="auto">
                <v-container>
                  <v-row>
                    <v-col cols="8">
                      <v-text-field
                        prepend-icon="swap_vert"
                        type="number"
                        label="Height of Room"
                        :rules="roomRules"
                        v-model.number="scheduleData.roomHeight"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-alert v-model="validStrength" type="info" outlined dense>
                space must be enough for students
              </v-alert>
            </v-col>

            <v-col>
              <v-alert v-model="validRoom" type="info" outlined dense>
                Rooms must be equal to Faculty
              </v-alert>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn class="pa-6" color="indigo darken-2" @click="step = 2" text>
            <v-icon>navigate_before </v-icon>
            Previous
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="pa-6"
            color="indigo darken-2"
            :disabled="validRoom || validStrength"
            @click="
              step = 4;
              idGen();
            "
            text
          >
            Next
            <v-icon>navigate_next </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-stepper-content>

    <!--STEP__4 -->
    <v-stepper-content step="4">
      <v-card height="auto" width="auto" class="justify-center">
        <v-container>
          <v-row class="">
            <v-col cols="6">
              <v-row>
                <v-card class="" height="auto" width="500">
                  <v-container>
                    <v-card-title class="font-weight-bold">
                      <v-icon color="primary" large left>title </v-icon>
                      Title Details
                    </v-card-title>
                    <v-card-text>
                      <p class="text-h6">
                        <v-icon left>arrow_right</v-icon>Title:
                        {{ scheduleData.title }}
                      </p>
                      <p class="text-h6">
                        <v-icon left>arrow_right</v-icon>Branch:
                        {{ scheduleData.branch }}
                      </p>
                      <p class="text-h6">
                        <v-icon left>arrow_right</v-icon>Semester:
                        {{ scheduleData.sem }}
                      </p>
                    </v-card-text>
                  </v-container>
                </v-card>
              </v-row>
              <v-row>
                <v-card class=" mt-3" width="500" height="auto">
                  <v-card-title class="font-weight-bold">
                    <v-icon color="primary" large left>event </v-icon>
                    Date & Subject
                  </v-card-title>

                  <v-col cols="12">
                    <v-row>
                      <v-card
                        class="ma-2"
                        height="auto"
                        width="auto"
                        v-for="(date, index) in scheduleData.dates"
                        :key="index"
                        rounded="lg"
                      >
                        <v-card-text>
                          <p class="text-h6">
                            <v-icon left>arrow_right</v-icon>Date:
                            {{ date }}
                          </p>
                          <p class="text-h6">
                            <v-icon left>arrow_right</v-icon> Subject:
                            {{ scheduleData.subjects[index] }}
                          </p>
                        </v-card-text>
                      </v-card>
                    </v-row></v-col
                  ></v-card
                >
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-card height="auto" width="900">
                <v-container>
                  <v-card-title class="font-weight-bold">
                    <v-row>
                      <v-col>
                        <v-icon color="primary" large left
                          >settings_overscan
                        </v-icon>
                        Seating Details
                      </v-col>
                      <v-col></v-col>
                    </v-row>
                  </v-card-title>
                  <v-card-text
                    v-if="
                      scheduleData.roomArray &&
                        scheduleData.roomArray.length === scheduleData.rooms &&
                        scheduleData.roomArray[0].length ===
                          scheduleData.roomWidth &&
                        scheduleData.roomArray[0][0].length ===
                          scheduleData.roomHeight
                    "
                  >
                    <v-card
                      v-for="(r, index) in scheduleData.rooms"
                      :key="r"
                      v-model="index"
                      height="auto"
                      v-if="scheduleData.rooms && page === r"
                    >
                      <v-card-title>Room:{{ r }} </v-card-title>
                      <v-container>
                        <v-row
                          justify="center"
                          v-for="h in scheduleData.roomHeight"
                          :key="h"
                        >
                          <v-col
                            v-for="w in scheduleData.roomWidth"
                            :cols="12 / scheduleData.roomWidth"
                            :key="w"
                          >
                            <v-card>
                              <v-card-title>
                                {{
                                  scheduleData.roomArray[page - 1][w - 1][h - 1]
                                }}
                              </v-card-title>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                  </v-card-text>
                  <v-card-actions>
                    <div class="text-center">
                      <v-pagination
                        v-if="scheduleData.rooms > 0"
                        v-model="page"
                        :length="scheduleData.rooms"
                      ></v-pagination>
                    </div>
                  </v-card-actions>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn class="pa-6" color="indigo darken-2" @click="step = 3" text>
            <v-icon>navigate_before </v-icon>
            Previous
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            dark
            class="pa-6"
            color="indigo darken-2"
            :disabled="!validPage2"
            @click="createSchedule"
          >
            Create Schedule
            <v-icon>navigate_next </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      scheduleData: {
        title: "",
        branch: "",
        sem: 1,
        dates: [],
        startTime: [],
        endTime: [],
        subjects: [],
        selectedStudents: [],
        selectedFaculties: [],
        rooms: Number,
        singleStrength: Number,
        roomWidth: Number,
        roomHeight: Number,
        roomArray: []
      },

      singleArray: [],
      digit: 0,
      i: 0,
      page: 1,
      startMenu: [],
      search: "",
      endMenu: [],
      step: 1,
      schedules: [],
      ssDialog: false,
      sfDialog: false,
      students: [],
      faculties: [],

      availableSubject: [
        [
          { text: "Physics", disabled: false },
          { text: "Mathematics-1", disabled: false },
          { text: "Elements of Mechanical Engineering", disabled: false },
          { text: "Workshop - Electronics", disabled: false }
        ],
        [
          { text: "Environmental Studies", disabled: false },
          { text: "Basic Electronics", disabled: false },
          { text: "Fundamentals of Programming", disabled: false },
          { text: "Engineering Graphics	", disabled: false }
        ],
        [
          { text: "Digital Logic & Design", disabled: false },
          { text: "Operating System", disabled: false },
          { text: "Data Structures", disabled: false },
          { text: "Discrete Mathematics	", disabled: false }
        ],
        [
          { text: "Database Management System", disabled: false },
          { text: "Python Programming", disabled: false },
          { text: "Microprocessor", disabled: false },
          { text: "Numerical Analysis & Statistical Methods", disabled: false }
        ],
        [
          { text: "Design and Analysis of Algorithm", disabled: false },
          { text: "Theory of Computation", disabled: false },
          { text: "Disaster Management", disabled: false },
          { text: "Mobile Communication", disabled: false }
        ],

        [
          { text: "Wireless Networks And Mobile Computing", disabled: false },
          { text: "Principles Of Compiler Design", disabled: false },
          { text: "Advanced Web Technology", disabled: false },
          { text: "Information Security", disabled: false }
        ],

        [
          { text: "Software Engineering", disabled: false },
          { text: "Parallel and Distributed Computing", disabled: false }
        ],
        [
          { text: "Big Data Analytics", disabled: false },
          { text: "Software Testing and Quality Assurance", disabled: false }
        ]
      ],
      branches: ["CSE", "ME", "CE", "EC"],
      sems: [1, 2, 3, 4, 5, 6, 7, 8],
      headers: [
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Branch", value: "branch" },
        { text: "Semester", value: "sem" },
        { text: "Email", value: "email" }
      ],
      Fheaders: [
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Subject", value: "subject" },
        { text: "Gender", value: "gender" },
        { text: "Email", value: "email" }
      ],
      titleRules: [v => !!v || "Schedule title is required"],
      branchRules: [v => !!v || "Branch is required"],
      semRules: [v => !!v || "Semester is required"],
      subjectRules: [v => !!v || "subject  is required"],
      roomRules: [v => !!v || "Field is required"]
    };
  },
  watch: {
    scheduleData: {
      handler(parentVal) {
        const val = parentVal.subjects;

        this.availableSubject[this.scheduleData.sem - 1].filter(sub => {
          if (val.includes(sub.text)) {
            sub.disabled = true;
          } else sub.disabled = false;
        });
      },
      deep: true
    }
  },
  mounted() {
    this.getFacultyList();
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
    validPage1() {
      let status = false;
      if (
        this.scheduleData.title &&
        this.scheduleData.sem &&
        this.scheduleData.branch &&
        this.scheduleData.dates[0]
      ) {
        status = true;
      }
      return status;
    },
    validPage2() {
      let status = false;
      if (this.scheduleData.dates.length > 0) {
        let date = this.scheduleData.dates.length;
        if (
          this.scheduleData.subjects.length >= date &&
          this.scheduleData.startTime.length >= date &&
          this.scheduleData.endTime.length >= date
        ) {
          status = true;
        }
      }
      return status;
    },
    validRoom() {
      let status = false;
      if (
        !this.scheduleData.rooms ||
        this.scheduleData.rooms != this.scheduleData.selectedFaculties.length
      ) {
        status = true;
      }
      return status;
    },
    validStrength() {
      let status = false;
      if (
        2 > 3 ||
        this.scheduleData.roomWidth === null ||
        this.scheduleData.roomWidth *
          this.scheduleData.roomHeight *
          this.scheduleData.rooms <
          this.scheduleData.selectedStudents.length
      ) {
        status = true;
      }
      return status;
    }
  },
  methods: {
    idGen() {
      this.scheduleData.roomArray = [];
      let branch = this.scheduleData.branch + 0;
      let sem = this.scheduleData.sem;
      let digit = sem * 1000.01;
      for (let r = 0; r < this.scheduleData.rooms; r++) {
        this.singleArray = [];
        for (let w = 0; w < this.scheduleData.roomWidth; w++) {
          this.singleArray.push([]);
          for (let h = 0; h < this.scheduleData.roomHeight; h++) {
            digit++;
            let id = Math.floor(digit).toString();
            this.singleArray[w][h] = branch + id;
            if (
              Math.floor(digit % 1000) >
              this.scheduleData.selectedStudents.length
            ) {
              this.singleArray[w][h] = null;
            }
          }
        }
        this.scheduleData.roomArray.push(this.singleArray);
      }
    },
    formateDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    async getStudentList() {
      const res = await axios.post(
        "http://localhost:3000/admin/home/getsortedstudent/",
        { sem: this.scheduleData.sem, branch: this.scheduleData.branch }
      );

      if (res.data) {
        this.students = res.data;
        this.isLoading = false;
      }
    },

    async getFacultyList() {
      const res = await axios.get(
        "http://localhost:3000/admin/home/getfaculty"
      );

      if (res.data) {
        this.faculties = res.data;
      }
    },
    scheduleRefresh() {
      this.$emit("refresh");
    },
    async createSchedule() {
      let formData = new FormData();
      let allDates = this.scheduleData.dates;
      let formatedDates = [];
      for (let i in allDates) {
        let [year, month, day] = allDates[i].split("-");
        formatedDates.push(`${day}/${month}/${year}`);
      }
      this.scheduleData.dates = formatedDates;

      formData.append("scheduleData", JSON.stringify(this.scheduleData));
      const res = await axios.post(
        "http://localhost:3000/admin/home/postschedule/",
        formData
      );
      if (res) {
        this.scheduleRefresh();
        this.step = 1;
      } else console.log("else executed");
    }
  }
};
</script>
