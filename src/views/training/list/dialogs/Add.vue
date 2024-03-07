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
                v-else-if="key === 'teachers'"
                v-model="localEditedItem[key]"
                :items="teachersList"
                :error-messages="localGetErrorMessages(key)"
                item-text="name"
                label="Select a Teacher"
                solo
                return-object
              >
                <template v-slot:item="{ item }">
                  <div>
                    <div>{{ item.name }}</div>
                    <div class="subtext">{{ item.email }}</div>
                  </div>
                </template>
              </v-select>
              <v-select
                v-else-if="key === 'students'"
                v-model="localEditedItem[key]"
                :items="studentsList"
                :error-messages="localGetErrorMessages(key)"
                item-text="name"
                label="Select a Students"
                solo
                multiple
                chips
                return-object
              >
                <template v-slot:item="{ item }">
                  <div>
                    <div>{{ item.name }}</div>
                    <div class="subtext">{{ item.email }}</div>
                  </div>
                </template>
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col> </v-col>
            <v-col> </v-col>
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
import { getErrorMessages } from "@/utils/functions";
import { validationMixin } from "vuelidate";

import {
  required,
  minLength,
  maxLength,
  decimal
} from "vuelidate/lib/validators";
import {
  defaultTraining,
  teachersList,
  studentsList
} from "@/utils/data_of_list";
export default {
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
          }
          return [key, validators];
        })
      )
    }
  },
  data() {
    return {
      dialog: false,
      localEditedItem: defaultTraining,
      teachersList,
      studentsList
    };
  },
  watch: {
    dialog(newVal) {
      if (!newVal) {
        this.closeDialog();
      }
    }
  },
  methods: {
    localGetErrorMessages(key) {
      return getErrorMessages.call(this, key);
    },
    closeDialog() {
      this.dialog = false;
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("save", { ...this.localEditedItem });
        this.closeDialog();
      }
    }
  }
};
</script>
