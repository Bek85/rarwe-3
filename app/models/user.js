import Model, { attr } from "@ember-data/model";
import { buildValidations, validator } from "ember-cp-validations";

const Validations = buildValidations({
  email: [
    validator("presence", {
      presence: true,
      ignoreBlank: true,
      message: "Email can't be empty",
    }),
    validator("format", {
      type: "email",
      message: "Email should be a valid email",
    }),
  ],

  password: [
    validator("presence", {
      presence: true,
      ignoreBlank: true,
      message: "Password can't be empty",
    }),
    validator("length", {
      min: 8,
      message: "Password should be at least 8 characters",
    }),
  ],
});

export default Model.extend(Validations, {
  email: attr(),
  password: attr(),
});
