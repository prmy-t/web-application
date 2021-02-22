<template>
  <v-card>
    <v-card-title class="headline"
      ><v-icon left large>delete</v-icon>Are you sure you want to delete
      selected Faculties?</v-card-title
    >
    <v-card-actions class="mt-5">
      <v-spacer></v-spacer>
      <v-btn class="mr-3" outlined color="red darken-1" text @click="hideDialog"
        >No</v-btn
      >
      <v-btn class="ml-3" color="primary" @click="dialogOperation">Yes</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  props: {
    deleteItem: Array
  },
  methods: {
    hideDialog() {
      this.$emit("hideDialog");
    },
    dialogOperation() {
      this.deleteConfirm();
    },
    async deleteConfirm() {
      const res = await axios.post(
        "http://localhost:3000/admin/home/deleteselectedfaculty",
        { selected: this.deleteItem }
      );
      if (res) {
        this.$emit("refresh");
      }
    }
  }
};
</script>
