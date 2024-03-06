<template>
  <v-data-table
    :headers="headers"
    :items="students"
    :items-per-page="15"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Students Table</v-toolbar-title>
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
import { studentsList, defaultStudent } from "@/utils/data_of_list";
import { studentsHeader } from "@/utils/header_of_list.js";

import { Add, Edit, Details, Delete } from "./dialogs";

export default {
  name: "StudentsList",
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
      headers: studentsHeader,
      students: [],
      editedIndex: -1,
      editedItem: defaultStudent,
      defaultItem: defaultStudent,
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
      this.students = studentsList;
    },

    editItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editDialog = true;
    },
    showItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.detailDialog = true;
    },
    deleteItem(item) {
      this.deleteIndex = this.students.indexOf(item);
      this.deletedItem = Object.assign({}, item);
      this.deleteDialog = true;
    },
    handleDelete(confirm) {
      if (!confirm) {
        return;
      }
      if (this.deleteIndex !== -1) {
        this.students.splice(this.deleteIndex, 1);
      }
      this.deletedItem = null;
      this.deleteDialog = false;
    },

    resetEditedItem() {
      this.editedItem = { ...this.defaultItem };
      this.editedIndex = -1;
    },

    save(newItem) {
      if (this.editedIndex > -1) {
        Object.assign(this.students[this.editedIndex], newItem);
      } else {
        this.students.push(newItem);
      }
      this.resetEditedItem();
    }
  }
};
</script>
