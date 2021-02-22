<template>
  <v-card>
    <v-card-title>
      <div class="text-h5">Results</div>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search Student"
        single-line
        filled
        rounded
        dense
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn
        v-if="declare == false"
        @click="declare = true"
        dense
        color="primary"
        >Declare</v-btn
      ><v-btn
        v-if="declare == true"
        @click="declare = false"
        dense
        color="error"
        >roll back</v-btn
      >
    </v-card-title>
    <v-data-table
      class="elevation-1 "
      :headers="headers"
      :items="sheetData"
      item-key="email"
      :items-per-page="5"
      :search="search"
    >
      <template v-slot:item.cgpa="{ item }">
        <v-chip :color="getColor(item.cgpa)" dark>
          {{ item.cgpa }}
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  props: {
    sheetData: {},
    title: String,
    headerText: []
  },
  mounted() {
    this.maker();
  },
  data() {
    return {
      search: "",
      declare: false,
      headers: []
    };
  },
  methods: {
    maker() {
      let newHeaders = [];
      let a = 15;
      newHeaders.push(
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "examId", value: "examId" }
      );
      for (let h in this.headerText) {
        newHeaders.push({
          text: `${this.headerText[h]}`,
          value: h
        });
      }
      newHeaders.push({ text: "CGPA", value: "cgpa" });
      newHeaders.push({ text: "BackLog", value: "backLog" });
      this.headers = newHeaders;
    },
    getColor(cgpa) {
      if (cgpa >= 7.5) return "green";
      else if (cgpa > 6) return "orange";
      else return "red";
    }
  }
};
</script>
