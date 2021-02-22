<template>
  <v-card rounded="lg">
    <v-card-title class="headline grey lighten-2">
      <SCHEDULEFORM :schedule="item" />
    </v-card-title>
    <v-card-text>{{ item.title }} </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="red" outlined text @click="closeDialog">
        Cancel
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="detailsDialog = false">
        Save
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
  methods: {
    closeDialog() {
      this.$emit("refresh");
    },
    editItem() {
      this.$emit("editSchedule");
    }
  }
};
</script>
