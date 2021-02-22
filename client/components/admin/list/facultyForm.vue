<template>
  <v-card class="pa-1">
    <v-card-title>
      <div class="display-1">
        <v-icon color="primary" left large>
          {{ title === "Add Faculty" ? "add_box" : "edit" }}</v-icon
        >
        {{ title }}
      </div>
    </v-card-title>
    <v-container>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              prepend-icon="title"
              label="First Name"
              :rules="nameRules"
              v-model="editItem.firstName"
              required
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              prepend-icon="title"
              label="Last Name"
              :rules="nameRules"
              v-model="editItem.lastName"
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              prepend-icon="subject"
              :items="subjects"
              v-model="editItem.subject"
              label="Select Subject"
              :rules="subjectRules"
              required
            ></v-select> </v-col
          ><v-col>
            <v-select
              prepend-icon="wc"
              :items="genders"
              v-model="editItem.gender"
              label="Gender"
              :rules="genderRules"
              required
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              prepend-icon="account_box"
              label="email"
              :rules="emailRules"
              v-model="editItem.email"
              required
            >
            </v-text-field> </v-col
          ><v-col>
            <v-file-input
              v-model="editItem.image"
              prepend-icon="photo_camera"
              accept="image/*"
              label="Add Image"
              show-size
              chips
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              prepend-icon="call"
              label="Faculty Contact"
              :rules="contactRules"
              v-model="editItem.contact"
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-text-field
              prepend-icon="vpn_key"
              type="password"
              label="Password"
              v-model="editItem.password"
              :rules="passwordRules"
              :append-icon="eye ? 'visibility_off' : 'visibility'"
              @click:append="() => (eye = !eye)"
              :type="eye ? 'password' : 'text'"
              required
              counter
            >
            </v-text-field>
            <v-text-field
              prepend-icon="vpn_key"
              type="password"
              label="Confirm Password"
              v-model="editItem.confirmPassword"
              :rules="confirmPasswordRule"
              required
              counter
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn outlined color="red darken-1" align="right" @click="hideDialog">
          Cancle
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          align="blue darken-1"
          color="info"
          :disabled="!validRecord"
          @click="dialogOperation"
        >
          {{ dialogType === "add" ? "Add Faculty" : "Save" }}
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  props: {
    editItem: Object,
    title: String,
    dialogType: String
  },
  data() {
    return {
      eye: true,
      menu: false,
      genders: ["Male", "Female"],
      subjects: ["DAA", "Maths-1", "FOP", "DLD", "AI"],
      genders: ["Male", "Female"],
      nameRules: [v => !!v || "Name is required"],
      genderRules: [v => !!v || "Gender is required"],
      subjectRules: [v => !!v || "Subject is required"],

      contactRules: [v => !!v || "Contact is required"],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 8 || "Password must be 8 character long"
      ],
      confirmPasswordRule: [
        v => v === this.editItem.password || "Password must match"
      ]
    };
  },

  computed: {
    validRecord() {
      const validFirstName = this.editItem.firstName;
      const validLastName = this.editItem.lastName;

      const validSubject = this.editItem.subject;
      const validGender = this.editItem.gender;

      const validSContact = this.editItem.contact;
      const validEmail =
        this.editItem.email && /.+@.+/.test(this.editItem.email);
      const validPassword = this.editItem.password;
      const validConfirmPassword = this.editItem.confirmPassword;

      if (
        validFirstName &&
        validLastName &&
        validSubject &&
        validGender &&
        validSContact &&
        validEmail &&
        validPassword.length >= 8 &&
        validPassword === validConfirmPassword
      ) {
        return true;
      }
      return false;
    }
  },
  methods: {
    hideDialog() {
      this.$emit("hideDialog");
    },
    dialogOperation() {
      if (this.dialogType == "add") {
        this.addFaculty();
      } else {
        this.editConfirm();
      }
    },
    async addFaculty() {
      let formData = new FormData();
      formData.append("file", this.editItem.image);
      formData.append("user", JSON.stringify(this.editItem));
      const res = await axios.post(
        "http://localhost:3000/admin/home/addFaculty",
        formData
      );

      if (res) {
        this.$emit("refresh");
      } else console.log("empty");
    },
    async editConfirm() {
      const editUser = {
        id: this.editItem._id,
        firstName: this.editItem.firstName,
        lastName: this.editItem.lastName,
        gender: this.editItem.gender,
        subject: this.editItem.subject,
        contact: this.editItem.contact,
        email: this.editItem.email,
        password: this.editItem.password,
        image: this.editItem.image.name
      };
      let formData = new FormData();
      formData.append("file", this.editItem.image);
      formData.append("editUser", JSON.stringify(editUser));
      const res = await axios.post(
        "http://localhost:3000/admin/home/editfaculty",
        formData
      );
      if (res) {
        this.$emit("refresh");
      }
    }
  }
};
</script>

<style scoped>
.theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #1710101f !important;
  color: #b9b9b9 !important;
}
</style>
