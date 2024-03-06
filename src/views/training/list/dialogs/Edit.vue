<template>
  <v-dialog :value="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Edit Item</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              v-for="(_, key) in localEditedItem"
              :key="key"
              cols="12"
              md="6"
            >
              <v-text-field
                v-if="key === 'name' || key === 'price'"
                v-model="localEditedItem[key]"
                :label="key"
                :error-messages="localGetErrorMessages(key)"
                @input="$v.localEditedItem[key].$touch()"
                @blur="$v.localEditedItem[key].$touch()"
              ></v-text-field>
              <v-select
                v-else-if="key === 'teachers' || key === 'students'"
                v-model="localEditedItem[key]"
                :items="localEditedItem[key]"
                :label="key === 'students' ? 'Students' : 'Teachers'"
              >
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
                        @click="
                          removeButtonClicked(
                            localEditedItem,
                            selectedItem,
                            key.toString().toLowerCase()
                          )
                        "
                        ><v-icon dark> mdi-minus </v-icon></v-btn
                      >
                    </v-list-item-action>
                  </v-list-item>
                </template>
              </v-select>
              <v-select
                v-else
                v-model="localEditedItem[key]"
                :items="localEditedItem[key]"
                :label="'Select ' + key.replace('add', '')"
              >
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
                        @click="
                          addButtonClicked(
                            localEditedItem,
                            selectedItem,
                            key.replace('add', '').toString().toLowerCase()
                          )
                        "
                        ><v-icon dark> mdi-plus </v-icon></v-btn
                      >
                    </v-list-item-action>
                  </v-list-item>
                </template>
              </v-select>
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
import { defaultTraining } from "@/utils/data_of_list";
import { getErrorMessages } from "@/utils/functions";
import { validationMixin } from "vuelidate";
import { addButtonClicked, removeButtonClicked } from "@/utils/functions";
import {
  required,
  minLength,
  maxLength,
  decimal
} from "vuelidate/lib/validators";

export default {
  props: {
    dialog: Boolean,
    editedItem: Object
  },
  mixins: [validationMixin],
  validations: {
    localEditedItem: {
      ...Object.fromEntries(
        Object.keys(defaultTraining).map((key) => {
          const validators = { required };
          if (key === "name") {
            validators.minLength = minLength(5);
            validators.maxLength = maxLength(20);
          } else if (key === "price") {
            validators.numeric = decimal;
          } else if (key === "teachers" || key === "students") {
            validators.required = {};
          }
          return [key, validators];
        })
      )
    }
  },
  data() {
    return {
      localEditedItem: {}
    };
  },
  watch: {
    dialog(newVal) {
      if (newVal) {
        this.localEditedItem = this.editedItem;
      } else {
        this.closeDialog();
      }
    },

    localEditedItem: {
      handler(newVal) {
        this.$emit("update:editedItem", { ...newVal });
      },
      deep: true
    }
  },
  methods: {
    localGetErrorMessages(key) {
      return getErrorMessages.call(this, key);
    },
    closeDialog() {
      this.$emit("update:editDialog", false);
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("save", { ...this.localEditedItem });
        this.closeDialog();
      }
    },
    addButtonClicked(localItem, selectedItem, type) {
      return addButtonClicked.call(this, localItem, selectedItem, type);
    },
    removeButtonClicked(localItem, selectedItem, type) {
      return removeButtonClicked.call(this, localItem, selectedItem, type);
    }
  }
};
</script>
