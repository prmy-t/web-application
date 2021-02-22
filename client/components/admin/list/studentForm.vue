<template>
  <v-card class="pa-1">
    <v-card-title>
      <div class="display-1">
        <v-icon color="primary" left large
          >{{ title === "Add Student" ? "add_box" : "edit" }}
        </v-icon>
        {{ title }}
      </div>
    </v-card-title>

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
          </v-text-field> </v-col
        ><v-col>
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
      <v-row justify="space-around">
        <v-col>
          <v-select
            prepend-icon="engineering"
            :items="branches"
            v-model="editItem.branch"
            label="Select Branch"
            required
            :rules="branchRules"
          ></v-select> </v-col
        ><v-col>
          <v-select
            prepend-icon="format_list_numbered"
            :items="sems"
            v-model="editItem.sem"
            label="Select Sem"
            :rules="semRules"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="editItem.date"
                label="Select Student Birth Date"
                prepend-icon="date_range"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="editItem.date"
              @input="menu = false"
            ></v-date-picker>
          </v-menu> </v-col
        ><v-col>
          <v-select
            prepend-icon="wc"
            :items="genders"
            v-model="editItem.gender"
            label="Gender"
            :rules="genderRules"
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            prepend-icon="call"
            label="Student Contact"
            :rules="ContactRules"
            v-model="editItem.studentContact"
            required
            counter
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            prepend-icon="call"
            label="Parent Contact"
            :rules="pContactRules"
            v-model="editItem.parentContact"
            required
            counter
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            prepend-icon="face"
            label="email"
            :rules="emailRules"
            v-model="editItem.email"
            required
          >
          </v-text-field> </v-col
        ><v-col>
          <v-file-input
            prepend-icon="photo_camera"
            accept="image/*"
            label="Add Image"
            show-size
            chips
            v-model="editItem.image"
          >
          </v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center">
          <v-text-field
            prepend-icon="vpn_key"
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
      <v-btn outlined color="red darken-1" text @click="hideDialog">
        Cancel
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        :disabled="!validRecord"
        @click="dialogOperation"
        dark
      >
        {{ dialogType === "add" ? "Add Student" : "Save" }}
      </v-btn>
    </v-card-actions>
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
      snackbar: false,
      branches: ["CSE", "ME", "CE", "EC"],
      sems: [1, 2, 3, 4, 5, 6, 7, 8],
      genders: ["Male", "Female"],
      nameRules: [v => !!v || "Name is required"],
      branchRules: [v => !!v || "Branch is required"],
      semRules: [v => !!v || "Semester is required"],
      genderRules: [v => !!v || "Gender is required"],
      subjectRules: [v => !!v || "Subject is required"],
      ContactRules: [
        v => !!v || "Contact is required",
        v => /^\d{10}$/.test(v) || "contact must be 10 digit"
      ],
      pContactRules: [
        v => !!v || "Contact is required",
        v => /^\d{10}$/.test(v) || "contact must be 10 digit"
      ],
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
    subjects: {
      get() {
        return this.$store.state.availableSubjects.subjects;
      }
    },
    validRecord() {
      const validFirstName = this.editItem.firstName;
      const validLastName = this.editItem.lastName;
      const validBranch = this.editItem.branch;
      const validSem = this.editItem.sem;
      const validGender = this.editItem.gender;
      const validDate = this.editItem.date;
      const validSContact = this.editItem.studentContact;
      const validPContact = this.editItem.parentContact;
      const validEmail =
        this.editItem.email && /.+@.+/.test(this.editItem.email);
      const validPassword = this.editItem.password;
      const validConfirmPassword = this.editItem.confirmPassword;
      if (
        validFirstName &&
        validLastName &&
        validBranch &&
        validSem &&
        validGender &&
        validDate &&
        validSContact &&
        validPContact &&
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
        this.addStudent();
      }
      if (this.dialogType == "edit") {
        this.editConfirm();
      } else {
      }
    },
    async addStudent() {
      let result = {};
      for (let i = 0; i < this.subjects.length; i++) {
        let semName = "sem" + (i + 1).toString();
        let sub = this.subjects[i];
        let tempObj = {};
        for (let j = 0; j < sub.length; j++) {
          tempObj[sub[j]] = null;
        }
        result["sem" + [i + 1].toString()] = tempObj;
      }
      result["addSheet"] = false;
      result["declare"] = false;
      this.editItem.result = result;
      let formData = new FormData();
      formData.append("file", this.editItem.image);
      formData.append("user", JSON.stringify(this.editItem));
      const res = await axios.post(
        "http://localhost:3000/admin/home/addStudent",
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
        branch: this.editItem.branch,
        sem: this.editItem.sem,
        date: this.editItem.date,
        gender: this.editItem.gender,
        studentContact: this.editItem.studentContact,
        parentContact: this.editItem.parentContact,
        email: this.editItem.email,
        password: this.editItem.password,
        image: this.editItem.image.name
      };
      let formData = new FormData();
      formData.append("file", this.editItem.image);
      formData.append("editUser", JSON.stringify(editUser));
      const res = await axios.post(
        "http://localhost:3000/admin/home/editstudent",
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
