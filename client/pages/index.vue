<template>
  <v-main class="indigo lighten-5">
    <v-container>
      <v-col class="mt-5">
        <v-card class="mx-auto rounded-lg my-auto" max-width="550">
          <v-container class="justify-center">
            <v-card-title class="justify-center">
              <p class="text-h4">
                Login
              </p>
            </v-card-title>
            <v-row class="mt-16 mb-16">
              <v-col align="center" sm="10" md="8" lg="4">
                <v-btn href="/student/login">
                  <v-icon left>face</v-icon>
                  <span> Student</span>
                </v-btn>
              </v-col>
              <v-col align="center" sm="10" md="8" lg="4">
                <v-btn href="/faculty/login">
                  <v-icon left>account_box </v-icon>
                  <span> Faculty</span>
                </v-btn>
              </v-col>
              <v-col align="center" sm="10" md="8" lg="4">
                <v-btn href="/admin/login">
                  <v-icon left>admin_panel_settings </v-icon>
                  <span> Admin</span>
                </v-btn>
              </v-col>
              <v-col>
                <cleave v-model="cardNumber" :options="options" name="card" />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-container>
  </v-main>
</template>
<script>
export default {
  data() {
    return {};
  },

  layout: "login",

  methods: {}
};
</script>
