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
        <form>
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
                  :error-messages="localGetErrorMessages(key)"
                  @input="$v.localEditedItem[key].$touch()"
                  @blur="$v.localEditedItem[key].$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </form>
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
import { getErrorMessages, phoneNumber } from "@/utils/functions";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
  numeric,
  decimal
} from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    localEditedItem: {
      ...Object.fromEntries(
        Object.keys(defaultTeacher).map((key) => {
          const validators = { required };
          if (key === "email") {
            validators.email = email;
          } else if (key === "name") {
            validators.minLength = minLength(5);
            validators.maxLength = maxLength(20);
          } else if (key === "age") {
            validators.numeric = numeric;
          } else if (key === "phone") {
            validators.phone = phoneNumber;
          } else if (key === "rate") {
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
      localEditedItem: defaultTeacher
    };
  },
  watch: {
    dialog(newVal) {
      if (!newVal) {
        this.$v.$reset();
        this.closeDialog();
      }
    }
  },
  methods: {
    localGetErrorMessages(key) {
      return getErrorMessages.call(this, key);
    },
    closeDialog() {
      this.localEditedItem = defaultTeacher;
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
