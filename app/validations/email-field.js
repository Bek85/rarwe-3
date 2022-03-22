import { validator } from "ember-cp-validations";

export default [
  validator("presence", {
    presence: true,
    ignoreBlank: true,
    message: "Email can't be empty",
  }),
  validator("format", {
    type: "email",
    message: "Email should be a valid email",
  }),
];
