<template>
  <v-card rounded="lg">
    <v-card-title class="headline grey lighten-2">
      {{ page === 1 ? "Title Details" : "Seating Details" }}
    </v-card-title>
    <v-card-subtitle class="headline grey lighten-2">
      <!-- {{ item }} -->
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-text class="mt-2">
      <div v-if="page === 1">
        <v-row class="text-h5" justify="center">
          <v-col>Title: {{ item.title }} </v-col
          ><v-col> Branch: {{ item.branch }} </v-col>
          <v-col>Semester: {{ item.sem }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="6" v-for="(date, index) in item.dates" :key="index">
            <v-card class="ml-4 mb-3" width="auto" rounded="lg">
              <v-card-text>
                <p class="text-h6">
                  <v-icon left>arrow_right</v-icon>Date:
                  {{ date }}
                </p>
                <p class="text-h6">
                  <v-icon left>arrow_right</v-icon> Subject:
                  {{ item.subjects[index] }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <p class="text-h5">Students: {{ item.students.length }}</p>
        <p class="text-h5">Faculties: {{ item.faculties.length }}</p>
      </div>
      <div v-if="page === 2">
        <v-card
          v-for="(room, index) in item.rooms"
          :key="index"
          class="ma-2"
          v-model="page"
          height="auto"
          v-if="roomPage == room"
        >
          <v-card-title>Room: {{ index + 1 }}</v-card-title>
          <v-container>
            <v-row
              justify="center"
              v-for="h in parseInt(item.roomHeight)"
              :key="h"
            >
              <v-col
                :cols="12 / parseInt(item.roomWidth)"
                v-for="w in parseInt(item.roomWidth)"
                :key="w"
              >
                <v-card>
                  <v-card-title>
                    {{ item.roomWiseId[roomPage - 1][w - 1][h - 1] }}
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions class="justify-center">
            <v-pagination
              circle
              v-model="roomPage"
              :length="item.rooms"
            ></v-pagination>
          </v-card-actions>
        </v-card>
      </div>
    </v-card-text>

    <v-divider></v-divider>
    <v-card-actions>
      <v-pagination v-model="page" :length="2"></v-pagination>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="closeDialog">
        Ok
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import SCHEDULEFORM from "@/components/admin/schedule/scheduleForm";
export default {
  components: { SCHEDULEFORM },
  props: {
    item: {}
  },
  data() {
    return {
      editDialog: false,

      page: 1,
      roomPage: 1
    };
  },
  methods: {
    // generationChecker(roomWiseId) {
    //   let examId = this.item.generatedStudents.examId;
    //   let status = "";
    //   for (var i = 0; i < examId.length; i++) {
    //     if (roomWiseId === examId[i]) {
    //       status = " (Generated)";
    //     }
    //   }
    //   return roomWiseId + status;
    // },
    closeDialog() {
      this.$emit("refresh");
    }
  }
};
</script>
