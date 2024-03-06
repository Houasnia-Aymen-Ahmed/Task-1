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
            @click="actionClicked(selectedItem)"
          >
            <v-icon dark>{{ icon }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
export default {
  props: {
    model: String,
    items: Array,
    label: String,
    icon: String
  },
  methods: {
    actionClicked(selectedItem) {
      this.$emit("action", selectedItem);
    }
  }
};
</script>
