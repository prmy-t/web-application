<template>
  <v-card>
    <v-card-title>
      <v-icon large>bookmark</v-icon>
      <h3>{{ title }}</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <h2>
              <v-icon small>fiber_manual_record</v-icon> Name:
              {{ resultData.fname }} {{ resultData.lname }}
            </h2>
          </v-col>
          <v-col>
            <h2>
              <v-icon small>fiber_manual_record</v-icon> Branch:
              {{ resultData.branch }}
            </h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h2>
              <v-icon small>fiber_manual_record</v-icon> Exam Id:
              {{ resultData.examId }}
            </h2>
          </v-col>
          <v-col>
            <h2>
              <v-icon small>fiber_manual_record</v-icon> Sem:
              {{ resultData.sem }}
            </h2>
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <v-row justify="center">
          <v-col
            cols="3"
            v-for="(sub, index) in resultData.subjects"
            :key="index"
          >
            <v-card dark :color="sub < 40 ? '#cf352e' : 'green'" height="auto">
              <v-card-text align="center">
                <v-row>
                  <v-col>
                    <h2>{{ index }}</h2>
                    <v-divider class="ml-12 mr-12 mt-1"></v-divider>
                    <h3>03106101</h3>
                  </v-col>
                </v-row>
                <v-row class="ma-2" justify="center">
                  <v-col class="ml-3 text-h3">
                    <!-- <div class=" ml-3 text-h2"> -->
                    {{ sub }}

                    <!-- </div> -->
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="mt-3">
                <div id="credit">Credits: 5/9</div>
                <v-spacer></v-spacer>
                <div id="credit">Grade: c+</div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="end">
          (*Marks are from out of 100)
        </v-row>
        <v-divider class="ma-2"></v-divider>
        <v-row>
          <v-col>
            <h2>
              <v-icon small>fiber_manual_record</v-icon>cgpa:
              {{ resultData.cgpa }}
            </h2>
          </v-col>

          <v-col>
            <h2>
              <v-icon small>fiber_manual_record</v-icon>BackLogs:
              {{ resultData.backLog }}
            </h2>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import admin from "../../layouts/admin.vue";
export default {
  components: { admin },
  props: {
    resultData: {},
    title: String
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
#credit {
  opacity: 0.6;
  letter-spacing: 2px;
  font-weight: 900;
}
</style>
