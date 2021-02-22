<template>
  <v-app id="indigo darken-2">
    <v-main class="indigo lighten-5">
      <div class="pt-10 pb-10 h3--text white--text indigo darken-2">
        <p class="display-1 text-center">
          Examination Management System
        </p>
      </div>
      <nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "@/components/footer";
export default {
  component: { Footer },
  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"]
  })
};
</script>
