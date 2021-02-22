<template>
  <v-col md="2"> 
          <v-sheet width="220" rounded="lg">
            <v-list color="transparent">
              <v-list-group :value="false">
                <template v-slot:activator>
                  <v-list-item-title>
                    <v-list-item-avatar size="36px">
                      <v-img
                        :src="`/images/student/${activeUser.image}`"
                        :alt="activeUser.firstName"
                      ></v-img> </v-list-item-avatar
                    >{{activeUser.firstName}}</v-list-item-title
                  >
                </template>
                <v-list-item @click="flag = 'profile'" link>
                  <v-list-item-icon>
                    <v-icon>perm_identity
                      </v-icon>
                  </v-list-item-icon>
                  <v-list-item-title> Profile </v-list-item-title>
                </v-list-item>
                <v-list-item @click="signOut" link>
                  <v-list-item-icon>
                    <v-icon color="red">exit_to_app</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title > Log Out</v-list-item-title>
                </v-list-item>
              </v-list-group>
              <v-list-item-group v-model="model">
                </v-list-item>
                <v-divider class="my-2"></v-divider>
                <v-list-item @click="buttonOneEvent">
                  <v-list-item-icon>
                    <v-badge
                      :content="badge"
                      :value="badge"
                      color="primary"
                      v-model="badgeModel"
                      overlap
                    >
                      <v-icon>schedule</v-icon>
                    </v-badge>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Schedule</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="flag = 'result'" link>
                  <v-list-item-icon> <v-icon>grade</v-icon></v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Result </v-list-item-title>
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
    badge:Number,
    btn1: "",
    btn2: ""
  },
  data() {
    return {
      icon1: "",
      icon2: "",
      model: "",
      badgeModel: this.badge === 'ND'?false:true,
      BadgeValue:0,
      oldBadgeValue: 0,
    };
  },
  computed: {
    flag: {
      get() {
        return this.$store.state.general.flag;
      },
      set(flag) {
        this.$store.commit("general/SET_FLAG", flag);
      }
    },
    isLoggedIn: {
      get() {
        return this.$store.state.auth.isLoggedIn;
      },
      set(status) {
        this.$store.commit("auth/SET_IS_LOGGEDIN", status);
      }
    },
    activeUser: {
      get() {
        return this.$store.state.user.activeUser;
      },

      set(activeUserObj) {
        this.$store.commit("user/SET_ACTIVEUSER", activeUserObj);
      }
    }
  },
  methods: {
    buttonOneEvent(){
      this.flag ='schedule';
      this.badgeModel=false;
      this.$emit("refresh")
    },
    signOut() {
      this.$removeCookie("token");
      this.$removeCookie("activeUser");
      this.isLoggedIn = false;
      this.$router.push("/");
    }
  }
};
</script>
