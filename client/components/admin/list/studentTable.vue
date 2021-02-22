<template>
  <v-card>
    <v-card-title>
      <div class="text-h5">Students</div>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search Student"
        single-line
        filled
        rounded
        dense
      ></v-text-field>
      <v-spacer></v-spacer>
      <!-- ADD_STUDENT_DIALOG -->
      <v-dialog v-model="studentDialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn depressed v-bind="attrs" v-on="on">
            <v-icon left> add </v-icon>
            Add Student
          </v-btn>
        </template>
        <!-- ADD_STUDENT -->
        <STUDENTFORM
          :editItem="newStudent"
          :title="addTitle"
          dialogType="add"
          @refresh="refreshData"
          @hideDialog="hideDialog"
        />
      </v-dialog>
      <!-- STUDENT_DIALOG_END -->
    </v-card-title>
    <v-row v-if="selected.length > 0">
      <v-col cols="1">
        <v-btn
          @click="dialogSelectedDelete = true"
          class="ma-2"
          text
          color="error"
        >
          <v-icon medium color="error">delete</v-icon>Delete
        </v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn class="ma-2 ml-10" text color="primary" @click="selected = []">
          Cancel
        </v-btn>
      </v-col></v-row
    >
    <v-data-table
      item-key="email"
      :headers="headers"
      :items="students"
      :items-per-page="10"
      class="elevation-1"
      :search="search"
      show-select
      v-model="selected"
    >
      <template v-slot:top>
        <v-dialog v-model="dialogEdit" max-width="600px">
          <template v-slot:activator="{ on, attrs }"></template>
          <!-- EDIT_STUDENT -->
          <STUDENTFORM
            :editItem="editItem"
            :title="editTitle"
            dialogType="edit"
            @refresh="refreshData"
            @hideDialog="hideDialog"
          />
        </v-dialog>
        <v-dialog v-model="dialogDelete" width="600px">
          <DELETESTUDENT
            :deleteItem="deleteItem"
            @refresh="refreshData"
            @hideDialog="hideDialog"
          />
        </v-dialog>
        <v-dialog v-model="dialogSelectedDelete" width="650px">
          <DELETESELECTEDSTUDENT
            :deleteItem="selected"
            @refresh="refreshData"
            @hideDialog="hideDialog"
          />
        </v-dialog>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon color="" small class="mr-2" @click="editStudent(item)">
          edit
        </v-icon>
        <v-icon color="" small @click="deleteStudent(item)">
          delete
        </v-icon>
      </template>
    </v-data-table>
    <v-snackbar v-model="snackbar" timeout="3000"
      >Student Added Successfully<template v-slot:action="{ attrs }">
        <v-btn text dark v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template></v-snackbar
    >
  </v-card>
</template>

<script>
import axios from "axios";
import STUDENTFORM from "@/components/admin/list/studentForm";
import DELETESTUDENT from "@/components/admin/list/deleteStudent";
import DELETESELECTEDSTUDENT from "@/components/admin/list/deleteSelectedStudent";
export default {
  components: { STUDENTFORM, DELETESTUDENT, DELETESELECTEDSTUDENT },

  data() {
    return {
      addTitle: "Add Student",
      editTitle: "Edit Student",
      studentDialog: false,
      dialogDelete: false,
      dialogSelectedDelete: false,
      dialogEdit: false,
      snackbar: false,
      search: "",
      selected: [],
      newStudent: {
        firstName: "",
        lastName: "",
        branch: "",
        sem: "",
        gender: "",
        date: "",
        studentContact: "",
        parentContact: "",
        email: "",
        image: null,
        password: "",
        confirmPassword: "",
        result: Object
      },
      students: [],
      editItem: [],
      deleteItem: [],
      headers: [
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Branch", value: "branch" },
        { text: "Semester", value: "sem" },
        { text: "Gender", value: "gender" },
        { text: "DOB", value: "date" },
        { text: "Contact", value: "studentContact", sortable: false },
        { text: "Parent Contact", value: "parentContact", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "Password", value: "password", sortable: false },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
  mounted() {
    this.getStudentList();
  },
  computed: {},
  methods: {
    refreshData() {
      // this.studentDialog = false;
      // this.dialogEdit = false;
      // this.dialogDelete = false;
      // this.dialogSelectedDelete = false;
      // this.selected = [];

      // this.newStudent = {
      //   firstName: "",
      //   lastName: "",
      //   branch: "",
      //   sem: "",
      //   gender: "",
      //   date: "",
      //   studentContact: "",
      //   parentContact: "",
      //   email: "",
      //   image: null,
      //   password: "",
      //   confirmPassword: ""
      // };
      location.reload();
      this.snackbar = true;
    },
    hideDialog() {
      this.dialogEdit = false;
      this.studentDialog = false;
      this.dialogDelete = false;
      this.dialogSelectedDelete = false;
    },
    async getStudentList() {
      const res = await axios.get(
        "http://localhost:3000/admin/home/getstudent"
      );
      if (res.data) {
        this.students = res.data;
        this.isLoading = false;
      }
    },

    async editStudent(item) {
      const email = item.email;
      const res = await axios.post(
        "http://localhost:3000/admin/home/findstudent",
        { email: email }
      );
      if (res) {
        this.editItem = res.data;
        this.editItem.confirmPassword = res.data.password;

        this.dialogEdit = true;
      }
    },

    async deleteStudent(item) {
      this.dialogDelete = true;
      const email = item.email;
      const res = await axios.post(
        "http://localhost:3000/admin/home/findstudent",
        { email: email }
      );
      if (res) {
        this.deleteItem = res.data;
      }
    }
  }
};
</script>
