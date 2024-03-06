<template>
  <v-select :value="model" :items="items" :label="label">
    <template v-slot:item="{ item: selectedItem }">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            {{ selectedItem }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action class="d-flex flex-row">
          <v-btn
            class="mx-1"
            dark
            small
            color="primary"
            @click="buttonClicked(selectedItem)"
          >
            <v-icon dark>{{
              btnType === "add" ? "mdi-plus" : "mdi-minus"
            }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
import { addButtonClicked, removeButtonClicked } from "@/utils/functions";
export default {
  props: {
    model: String,
    items: Array,
    label: String,
    btnType: String,
    localItem: Object,
    type: String
  },
  methods: {
    buttonClicked(selectedItem) {
      return this.btnType === "add"
        ? addButtonClicked.call(this, this.localItem, selectedItem, this.type)
        : removeButtonClicked.call(
            this,
            this.localItem,
            selectedItem,
            this.type
          );
    }
  }
};
</script>
