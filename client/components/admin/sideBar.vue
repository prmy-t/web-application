<template>
  <v-col cols="2">
    <v-sheet width="220" rounded="lg">
      <v-list color="transparent">
        <v-list-group :value="false">
          <template v-slot:activator>
            <v-list-item-title>
              <v-list-item-avatar size="36px">
                <v-img
                  src="https://cdn.dribbble.com/users/1041205/screenshots/3636353/dribbble.jpg"
                  alt="John"
                ></v-img> </v-list-item-avatar
              >My Profile</v-list-item-title
            >
          </template>
          <v-list-item @click="flag = 'profile'" link>
            <v-list-item-icon>
              <v-icon color="indigo darken-2">perm_identity</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="signOut" link>
            <v-list-item-icon>
              <v-icon color="red ">exit_to_app</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Log Out</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item-group>
          <v-divider class="my-2"></v-divider>
          <v-list-item @click="buttonOne">
            <v-list-item-icon>
              <v-icon color="indigo darken-2">
                {{ btn1 === "Student List" ? "view_list" : "schedule" }}
              </v-icon></v-list-item-icon
            >
            <v-list-item-content>
              <v-list-item-title>{{ btn1 }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="buttonTwo">
            <v-list-item-icon>
              <v-icon color="indigo darken-2">{{
                btn1 === "Student List" ? "view_list" : "add"
              }}</v-icon></v-list-item-icon
            >
            <v-list-item-content>
              <v-list-item-title>{{ btn2 }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-sheet>
  </v-col>
</template>

<script>
export default {
  props: {
    btn1: "",
    btn2: ""
  },
  data() {
    return {
      icon1: "",
      icon2: ""
    };
  },
  mounted() {},
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
    signOut() {
      // localStorage.setItem("token", null);
      this.$removeCookie("token");
      this.isLoggedIn = false;
      this.$router.push("/");
    },
    buttonOne() {
      if (this.btn1 === "Student List") this.flag = "student";
      if (this.btn1 === "Schedules") this.flag = "schedule";
      if (this.btn1 === "Result Sheets") {
        this.flag = "resultSheets";
      }
    },
    buttonTwo() {
      if (this.btn2 === "Faculty List") this.flag = "faculty";
      if (this.btn2 === "Add Schedule") this.flag = "addSchedule";
      if (this.btn2 === "Edit Sheets") {
        this.flag = "editSheets";
      }
    }
  }
};
</script>
