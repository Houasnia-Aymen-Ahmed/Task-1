<template>
  <v-dialog :value="dialog" persistent max-width="750px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Details</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              v-for="(value, key) in localItem"
              :key="key"
              cols="12"
              sm="6"
              md="4"
            >
              {{ key }}<br />
              {{ value }}
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    item: Object
  },
  data() {
    return {
      localItem: {}
    };
  },
  watch: {
    dialog(newVal) {
      if (newVal) {
        this.localItem = this.item;
      } else {
        this.closeDialog();
      }
    },
  },
  methods: {
    closeDialog() {
      this.$emit("update:detailDialog", false);
    }
  }
};
</script>
