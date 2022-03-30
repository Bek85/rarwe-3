import Controller from "@ember/controller";
import { action } from "@ember/object";
import { task } from "ember-concurrency";

export default Controller.extend({
  isEditing: false,

  init() {
    this._super(...arguments);
    this.set("showErrors", { description: false });
  },

  edit: action(async function () {
    this.set("isEditing", true);
  }),
  stopEditing: action(async function () {
    this.set("isEditing", false);
  }),

  save: task(function* () {
    let band = this.model;
    this.set("showErrors.description", true);
    if (band.validations.isValid) {
      yield band.save();
      this.set("isEditing", false);
    }
  }),
});
