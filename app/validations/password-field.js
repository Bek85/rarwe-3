import { validator } from "ember-cp-validations";

export default [
  validator("presence", {
    presence: true,
    ignoreBlank: true,
    message: "Password can't be empty",
  }),
  validator("length", {
    min: 8,
    message: "Password should be at least 8 characters",
  }),
];
