<template>
  <v-card>
    <v-card-title>
      <div class="text-h5">Faculties</div>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search Faculty"
        single-line
        filled
        rounded
        dense
      ></v-text-field>

      <!-- ADD_FACULTY_DIALOG -->
      <v-dialog v-model="facultyDialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn depressed v-bind="attrs" v-on="on">
            <v-icon dark left> add </v-icon>
            Add Faculty
          </v-btn>
        </template>
        <!-- ADD_FACULTY -->
        <FACULTYFORM
          :editItem="newFaculty"
          :title="addTitle"
          dialogType="add"
          @refresh="refreshData"
          @hideDialog="hideDialog"
        />
      </v-dialog>
      <!-- FACULTY_DIALOG_END -->
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
      :headers="headers"
      :items="faculties"
      item-key="email"
      :items-per-page="5"
      class="elevation-1"
      :search="search"
      show-select
      v-model="selected"
      ><template v-slot:top>
        <v-dialog v-model="dialogEdit" max-width="600px">
          <template v-slot:activator="{ on, attrs }"></template>

          <FACULTYFORM
            :editItem="editItem"
            :title="editTitle"
            dialogType="edit"
            @refresh="refreshData"
            @hideDialog="hideDialog"
          />
        </v-dialog>
        <v-dialog v-model="dialogDelete" width="600px">
          <DELETEFACULTY
            :deleteItem="deleteItem"
            @refresh="refreshData"
            @hideDialog="hideDialog"
          />
        </v-dialog>
        <v-dialog v-model="dialogSelectedDelete" width="650px">
          <DELETESELECTEDFACULTY
            :deleteItem="selected"
            @refresh="refreshData"
            @hideDialog="hideDialog"
          />
        </v-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editFaculty(item)">
          edit
        </v-icon>
        <v-icon small @click="deleteFaculty(item)">
          delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
import FACULTYFORM from "@/components/admin/list/facultyForm";
import DELETEFACULTY from "@/components/admin/list/deleteFaculty";
import DELETESELECTEDFACULTY from "@/components/admin/list/deleteSelectedFaculty";
export default {
  components: { FACULTYFORM, DELETEFACULTY, DELETESELECTEDFACULTY },
  data() {
    return {
      addTitle: "Add Faculty",
      editTitle: "Edit Faculty",
      facultyDialog: false,
      dialogDelete: false,
      dialogSelectedDelete: false,
      dialogEdit: false,
      search: "",
      deleteItem: {},
      selected: [],
      newFaculty: {
        firstName: "",
        lastName: "",
        subject: "",
        gender: "",
        contact: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      faculties: [],
      editItem: [],
      headers: [
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Subject", value: "subject" },
        { text: "Gender", value: "gender" },
        { text: "Contact", value: "contact", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "Password", value: "password", sortable: false },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
  mounted() {
    this.getFacultyList();
  },
  computed: {},
  methods: {
    refreshData() {
      this.facultyDialog = false;
      this.dialogEdit = false;
      this.dialogDelete = false;
      this.dialogSelectedDelete = false;
      this.selected = [];
      this.getFacultyList();
      this.newFaculty = {
        firstName: "",
        lastName: "",
        subject: "",
        gender: "",
        contact: "",
        email: "",
        image: "",
        password: "",
        confirmPassword: ""
      };
    },
    hideDialog() {
      this.dialogEdit = false;
      this.facultyDialog = false;
      this.dialogDelete = false;
      this.dialogSelectedDelete = false;
    },

    async getFacultyList() {
      const res = await axios.get(
        "http://localhost:3000/admin/home/getfaculty"
      );
      // console.log(res);
      if (res.data) {
        this.faculties = res.data;
        console.log(this.faculties);
        this.isLoading = false;
      }
    },
    async editFaculty(item) {
      const email = item.email;
      const res = await axios.post(
        "http://localhost:3000/admin/home/findfaculty",
        { email: email }
      );
      if (res) {
        this.editItem = res.data;
        this.editItem.confirmPassword = res.data.password;

        console.log(this.editItem);
        this.dialogEdit = true;
      }
    },

    async deleteFaculty(item) {
      this.dialogDelete = true;
      const email = item.email;
      const res = await axios.post(
        "http://localhost:3000/admin/home/findfaculty",
        { email: email }
      );
      if (res) {
        this.deleteItem = res.data;
      }
    },
    async deleteConfirm() {
      const res = await axios.post(
        "http://localhost:3000/admin/home/deletefaculty",
        { email: this.deleteItem.email }
      );
      if (res) {
        this.dialogDelete = false;
        this.getFacultyList();
      }
    }
  }
};
</script>
