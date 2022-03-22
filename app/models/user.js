import Model, { attr } from "@ember-data/model";
import { buildValidations } from "ember-cp-validations";
import emailField from "rarwe/validations/email-field";
import passwordField from "rarwe/validations/password-field";

const Validations = buildValidations({
  email: emailField,
  password: passwordField,
});

export default Model.extend(Validations, {
  email: attr(),
  password: attr(),
});
