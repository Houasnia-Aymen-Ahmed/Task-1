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
import { defaultStudent } from "@/utils/data_of_list";
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
  props: {
    dialog: Boolean,
    editedItem: Object
  },
  mixins: [validationMixin],
  validations: {
    localEditedItem: {
      ...Object.fromEntries(
        Object.keys(defaultStudent).map((key) => {
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
      this.$emit("save", { ...this.localEditedItem });
      this.closeDialog();
    }
  }
};
</script>
