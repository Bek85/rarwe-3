import Model, { attr } from "@ember-data/model";
import { buildValidations, validator } from "ember-cp-validations";
import { computed } from "@ember/object";

const Validations = buildValidations({
  name: validator("presence", {
    presence: true,
    message: "Name can't be empty",
  }),
});

export default Model.extend(Validations, {
  name: attr(),

  initials: computed("name", function () {
    return this.name
      .split(/\s+/)
      .map((namePart) => namePart.charAt(0))
      .join("");
  }),
});
