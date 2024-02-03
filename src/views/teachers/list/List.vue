<template>
  <v-data-table
    :headers="headers"
    :items="teachers"
    :items-per-page="15"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Teachers Table</v-toolbar-title>
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
      </v-toolbar>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="showItem(item)"> mdi-eye </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { teachersList, defaultTeacher } from "@/utils/data_of_list.js";
import { teachersHeader } from "@/utils/header_of_list.js";

import { Add, Edit, Details } from "./dialogs";

export default {
  name: "teachersList",
  components: {
    Add,
    Edit,
    Details
  },
  data() {
    return {
      dialog: false,
      editDialog: false,
      detailDialog: false,
      headers: teachersHeader,
      teachers: [],
      editedIndex: -1,
      editedItem: defaultTeacher,
      defaultItem: defaultTeacher
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.teachers = teachersList;
    },

    editItem(item) {
      this.editedIndex = this.teachers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editDialog = true;
    },
    showItem(item) {
      this.editedIndex = this.teachers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.detailDialog = true;
    },

    resetEditedItem() {
      this.editedItem = { ...this.defaultItem };
      this.editedIndex = -1;
    },

    save(newItem) {
      if (this.editedIndex > -1) {
        Object.assign(this.teachers[this.editedIndex], newItem);
      } else {
        this.teachers.push(newItem);
      }
      this.resetEditedItem();
    }
  }
};
</script>
