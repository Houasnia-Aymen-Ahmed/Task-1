<template>
  <v-dialog :value="dialog" max-width="500px">
    <v-card>
      <v-card-title class="text-h5"
        >Are you sure you want to delete this item?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean
  },

  watch: {
    dialog(newVal) {
      if (!newVal) {
        this.closeDialog();
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit("update:deleteDialog", false);
    },
    deleteItemConfirm() {
      this.$emit("delete", true);
      this.closeDialog();
    }
  }
};
</script>
