<template>
  <v-main class="indigo lighten-5">
    <v-container>
      <v-col>
        <v-card class="mx-auto rounded-lg my-10" max-width="520">
          <v-card-title class=" justify-center">
            <p class="text-h1">
              Login
            </p>
          </v-card-title>
          <v-container>
            <v-row align="center">
              <v-col align="center" sm="10" md="8" lg="4">
                <v-btn text href="/student/login">
                  <v-icon left>face</v-icon>
                  <span> Student</span>
                </v-btn>
              </v-col>
              <v-col align="center" sm="10" md="8" lg="4">
                <v-btn text href="/faculty/login">
                  <v-icon left>account_box </v-icon>
                  <span> Faculty</span>
                </v-btn>
              </v-col>
              <v-col align="center" sm="10" md="8" lg="4">
                <v-btn text href="/admin/login">
                  <v-icon left>admin_panel_settings </v-icon>
                  <span> Admin</span>
                </v-btn>
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
  layout: "login"
};
</script>
