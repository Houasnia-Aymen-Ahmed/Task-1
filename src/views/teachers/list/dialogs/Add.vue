<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
        New Item
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="text-h5">New Item</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              v-for="(_, key) in localEditedItem"
              :key="key"
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                v-model="localEditedItem[key]"
                :label="key"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog"> Cancel </v-btn>
        <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defaultTeacher } from "@/utils/data_of_list";
export default {
  data() {
    return {
      dialog: false,
      localEditedItem: defaultTeacher
    };
  },
  watch: {
    dialog(newVal) {
      if (!newVal) {
        this.closeDialog();
      }
    },
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    save() {
      this.$emit("save", { ...this.localEditedItem });
      this.closeDialog();
    }
  }
};
</script>
