<template>
  <v-card>
    <v-row>
      <v-col cols="9">
        <v-card-title>
          <p class="font-weight-medium text-h4">
            {{ activeUser.firstName + " " + activeUser.lastName }}
          </p>
        </v-card-title>
        <v-card-subtitle class="pb-0">
          {{ activeUser.type }} Profile
        </v-card-subtitle>
      </v-col>
      <v-col class="ml-16">
        <v-avatar class="profile" color="grey" size="180" tile>
          <v-img :src="`/images/student/${activeUser.image}`"></v-img>
        </v-avatar>
      </v-col>
    </v-row>
    <v-divider class="mt-1"></v-divider>
    <v-card-text class="text--primary">
      <p class="text-h5 mt-2">Email iD : {{ activeUser.email }}</p>
      <p class="text-h5">Branch : {{ activeUser.branch }}</p>
      <p class="text-h5">Semester : {{ activeUser.sem }}</p>
      <p class="text-h5">Gender : {{ activeUser.gender }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    activeUser: {
      get() {
        return this.$store.state.user.activeUser;
      },

      set(activeUserObj) {
        this.$store.commit("user/SET_ACTIVEUSER", activeUserObj);
      }
    }
  }
};
</script>
