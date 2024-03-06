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
              md="6"
            >
              <v-list-item v-if="key === 'name' || key === 'price'">
                <v-list-item-content>
                  <v-list-item-title>{{ value }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    key.charAt(0).toUpperCase() + key.slice(1)
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-menu
                v-else-if="key === 'teachers' || key === 'students'"
                origin="center center"
                transition="scale-transition"
                open-on-hover
              >
                <template v-slot:activator="{ on, attrs }">
                  <div
                    class="pa-4 text-left indigo lighten-4 text-no-wrap rounded-lg"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ key === "students" ? "Students" : "Teachers" }}
                  </div>
                </template>
                <v-list v-if="localItem[key].length > 0">
                  <v-list-item v-for="(item, i) in localItem[key]" :key="i">
                    <v-list-item-content>
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-list v-else>
                  <v-list-item>
                    <v-list-item-content>No Data Available</v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-menu
                v-else
                origin="center center"
                transition="scale-transition"
                open-on-hover
              >
                <template v-slot:activator="{ on, attrs }">
                  <div
                    class="pa-4 text-left indigo lighten-4 text-no-wrap rounded-lg"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ "Select " + key.replace("add", "") }}
                  </div>
                </template>
                <v-list v-if="localItem[key].length > 0">
                  <v-list-item v-for="(item, i) in localItem[key]" :key="i">
                    <v-list-item-content>
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-list v-else>
                  <v-list-item>
                    <v-list-item-content>No Data Available</v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
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
import { defaultTraining } from "@/utils/data_of_list";
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
        this.localItem = this.filterKeys(this.item);
      } else {
        this.closeDialog();
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit("update:detailDialog", false);
    },
    filterKeys(obj) {
      const filteredObj = {};
      for (const key in defaultTraining) {
        filteredObj[key] = Object.prototype.hasOwnProperty.call(obj, key)
          ? obj[key]
          : defaultTraining[key];
      }
      return filteredObj;
    }
  }
};
</script>
