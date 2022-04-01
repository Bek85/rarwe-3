import Model, { attr } from "@ember-data/model";
import { buildValidations, validator } from "ember-cp-validations";

const Validations = buildValidations({
  name: validator("presence", {
    presence: true,
    message: "Name can't be empty",
  }),
});

export default Model.extend(Validations, {
  name: attr(),
});
