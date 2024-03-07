<template>
  <v-data-table
    :headers="headers"
    :items="trainings"
    :items-per-page="15"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Trainings Table</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <Add @save="save" />
        <Edit
          :dialog="editDialog"
          :editedItem="editedItem"
          @save="save"
          @update:editDialog="editDialog = $event"
        />
        <Details
          :dialog="detailDialog"
          :item="editedItem"
          @update:detailDialog="detailDialog = $event"
        />
        <Delete
          :dialog="deleteDialog"
          @update:deleteDialog="deleteDialog = $event"
          @delete="handleDelete"
        />
      </v-toolbar>
    </template>
    <template v-slot:[`item.students`]="{ item }">
      <span>{{ item.students.length }} Students</span>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mx-1" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small class="mx-1" @click="showItem(item)"> mdi-eye </v-icon>
      <v-icon small class="mx-1" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import {
  trainingsList,
  defaultTraining,
  teachersList,
  studentsList
} from "@/utils/data_of_list.js";
import { trainingsHeader } from "@/utils/header_of_list.js";
import { Add, Edit, Details, Delete } from "./dialogs";

export default {
  name: "trainingsList",
  components: {
    Add,
    Edit,
    Details,
    Delete
  },
  data() {
    return {
      dialog: false,
      editDialog: false,
      detailDialog: false,
      headers: trainingsHeader,
      trainings: [],
      teachers: teachersList,
      students: studentsList,
      editedIndex: -1,
      editedItem: defaultTraining,
      defaultItem: defaultTraining,
      deleteDialog: false,
      deleteIndex: -1,
      deletedItem: null
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.trainings = trainingsList;
    },

    editItem(item) {
      this.editedIndex = this.trainings.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editDialog = true;
    },
    showItem(item) {
      this.editedIndex = this.trainings.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.detailDialog = true;
    },
    deleteItem(item) {
      this.deleteIndex = this.trainings.indexOf(item);
      this.deletedItem = Object.assign({}, item);
      this.deleteDialog = true;
    },
    handleDelete(confirm) {
      if (!confirm) {
        return;
      }
      if (this.deleteIndex !== -1) {
        this.trainings.splice(this.deleteIndex, 1);
      }
      this.deletedItem = null;
      this.deleteDialog = false;
    },
    resetEditedItem() {
      this.editedItem = { ...this.defaultItem };
      this.editedIndex = -1;
    },
    save(newItem) {
      console.log(newItem);
      if (this.editedIndex > -1) {
        Object.assign(this.trainings[this.editedIndex], newItem);
      } else {
        this.trainings.push(newItem);
      }
      this.resetEditedItem();
    }
  }
};
</script>
