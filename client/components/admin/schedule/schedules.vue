<template>
  <div>
    <v-card v-if="schedules.length > 0 && flag == 'schedule'">
      <v-card-title
        ><v-icon color="primary" left large>star</v-icon> Available Schedules
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6" v-for="(schedule, index) in schedules" :key="index">
            <v-card rounded="lg" class=" mr-1 ml-3">
              <v-row>
                <v-col cols="9">
                  <v-card-title class="font-weight-bold text-h5">
                    {{ schedule.title }}</v-card-title
                  >
                  <v-card-subtitle>
                    <p class="text-subtitle-1">
                      Branch: {{ schedule.branch }} | Sem:
                      {{ schedule.sem }}
                    </p></v-card-subtitle
                  >
                </v-col>
                <v-col>
                  <v-dialog v-model="detailsDialog" width="900">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        @click="scheduleDetail(schedule)"
                        color="primary"
                        >Details</v-btn
                      >
                    </template>
                    <DETAIL :item="item" @refresh="closeDialog" />
                  </v-dialog> </v-col
              ></v-row>
              <v-divider class="mr-1 ml-1"></v-divider>
              <!-- <v-card-actions> --><v-container>
                <v-row>
                  <v-col>
                    <v-select
                      v-model="schedule.declare"
                      :items="decValue"
                      :item-text="schedule.declare"
                      @change="declareSchedule(schedule._id, schedule.declare)"
                      dense
                      solo
                    ></v-select>
                  </v-col>

                  <v-col>
                    <v-btn
                      :disabled="schedule.declare === 'Undeclare'"
                      text
                      color="primary"
                    >
                      <v-icon left color="primary"> email</v-icon>
                      notify students
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-dialog
                      v-model="deleteDialog"
                      width="600"
                      transition="dialog-bottom-transition"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          text
                          color="error"
                          @click="findSchedule(schedule._id)"
                        >
                          <v-icon left color="red"> delete</v-icon>
                          Delete schedule
                        </v-btn>
                      </template>
                      <v-card>
                        <v-toolbar class="text-h5" color="primary" dark>{{
                          schedule.title
                        }}</v-toolbar>
                        <v-card-text>
                          <div class="text-h5 pa-5">
                            Are you sure you want to delete this schedule ?
                          </div>
                        </v-card-text>
                        <v-card-actions class="justify-space-between">
                          <v-btn
                            color="primary"
                            text
                            @click="deleteDialog = false"
                            ><v-icon left color="primary"
                              >arrow_back_ios</v-icon
                            >
                            No</v-btn
                          >
                          <v-btn
                            color="error"
                            outlined
                            text
                            @click="deleteSchedule"
                            >Yes<v-icon color="error" outlined right
                              >delete</v-icon
                            ></v-btn
                          >
                        </v-card-actions>
                      </v-card></v-dialog
                    >
                  </v-col>

                  <v-col>
                    <v-dialog
                      v-model="instDialog"
                      width="600"
                      height="auto"
                      transition="dialog-bottom-transition"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          text
                          @click="openInstruction(schedule)"
                        >
                          <v-icon color="orange"> campaign</v-icon
                          ><span>instruction</span></v-btn
                        >
                      </template>
                      <v-card>
                        <v-toolbar class="text-h5" color="primary" dark
                          >Add Instructions</v-toolbar
                        >
                        <!-- <v-card-text class="pt-5"> -->
                        <v-textarea
                          clearable
                          filled
                          class="pa-2"
                          auto-grow
                          solo
                          v-model="inst"
                        ></v-textarea>
                        <!-- </v-card-text> -->
                        <v-card-actions class="justify-space-around">
                          <v-btn
                            outlined
                            color="error"
                            text
                            @click="instDialog = false"
                            ><v-icon color="error" right>close</v-icon>
                            Cancle</v-btn
                          >
                          <v-btn
                            color="primary"
                            text
                            @click="addInstruction(inst)"
                            >Done<v-icon color="primary" left
                              >navigate_next</v-icon
                            ></v-btn
                          >
                        </v-card-actions>
                      </v-card></v-dialog
                    >
                  </v-col>
                </v-row>
              </v-container>
              <!-- </v-card-actions> -->
            </v-card>
            <v-snackbar text color="primary" v-model="snackbar" timeout="3000">
              <v-icon color="primary" left>check_circle</v-icon>
              {{ text }}
            </v-snackbar>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card height="600" v-if="schedules.length <= 0 && flag == 'schedule'">
      <v-container>
        <p class="text-h5" align="center">
          <v-icon large left>sentiment_very_dissatisfied </v-icon>
          No Schedules found
        </p>
        <p class="mt-12 text-h6" align="Center">
          You can create one from
          <v-icon>add </v-icon>Add Schedule
        </p></v-container
      >
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import DETAIL from "@/components/admin/schedule/detailDialog";

export default {
  components: { DETAIL },
  data() {
    return {
      snackbar: false,
      text: "",
      schedules: {},
      detailsDialog: false,
      editDialog: false,
      deleteDialog: false,
      instDialog: false,
      inst: null,
      item: {},
      instId: null,
      decValue: ["Declare", "Undeclare"],
      deleteScheduleData: {},
      inst: ""
    };
  },
  mounted() {
    this.scheduleRefresh();
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
    async scheduleRefresh() {
      const res = await axios.get(
        "http://localhost:3000/admin/home/getschedulelist"
      );

      if (res.data) {
        this.schedules = res.data;

        // this.dataLength = res.data.length;
        // this.flag = "schedule";
      }
    },
    scheduleDetail(item) {
      if (item) {
        this.item = item;
        this.detailsDialog = false;
      }
    },
    async findSchedule(id) {
      const res = await axios.post(
        "http://localhost:3000/admin/home/findschedule",
        { id }
      );
      this.deleteScheduleData = res.data;
    },
    async deleteSchedule() {
      const id = this.deleteScheduleData._id;
      const res = await axios.post(
        "http://localhost:3000/admin/home/deleteschedule",
        { id }
      );
      if (res) {
        this.deleteDialog = false;
        this.scheduleRefresh();
      }
    },
    editSchedule(schedule) {
      this.item = schedule;
      console.log(this.item);
      this.flag = "addSchedule";
    },
    openInstruction(item) {
      // console.log(, item.instruction);
      this.instId = item._id;
      this.inst = item.instruction;
    },
    async addInstruction(instruction) {
      let id = this.instId;
      let inst = instruction;

      const res = await axios.post(
        "http://localhost:3000/admin/home/addinstruction",
        { id, inst }
      );
      if (res) {
        this.instDialog = false;
        this.scheduleRefresh();
      }
    },
    async declareSchedule(id, value) {
      const declare = value;
      const res = await axios.post(
        "http://localhost:3000/admin/home/scheduledeclare",
        { id, declare }
      );
      if (res.data) {
        this.scheduleRefresh();
        this.text = value + "d successfully.";
        this.snackbar = true;
      } else console.log("error");
    },
    closeDialog() {
      this.detailsDialog = false;
      this.editDialog = false;
    }
  }
};
</script>
