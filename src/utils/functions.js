import { helpers } from "vuelidate/lib/validators";

export function getErrorMessages(key) {
  const field = this.$v.localEditedItem[key];

  if (!field.$pending && field.$error) {
    return Object.keys(field.$params)
      .filter((param) => !field[param])
      .map((param) => {
        switch (param) {
          case "required":
            return "This field is required.";
          case "email":
            return "Please enter a valid email address.";
          case "minLength":
            return `Please enter at least ${field.$params[param].min} characters.`;
          case "maxLength":
            return `Please enter no more than ${field.$params[param].max} characters.`;
          case "numeric":
            return "Please enter a valid number.";
          case "phone":
            return "Please enter a valid phone number.";
          default:
            return "Invalid value.";
        }
      });
  }

  return [];
}

export const phoneNumber = helpers.regex(
  "phone",
  /^\+?\d{10,12}$|^\d{10}$|^\+\d{3} \d{3} \d{3} \d{3}$|^\+\d{3} \d{3}\d{3}$|^\d{3} \d{2} \d{2} \d{2} \d{2}$/
);
