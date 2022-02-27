import Controller from "@ember/controller";
import { action } from "@ember/object";

export default Controller.extend({
  isEditing: false,

  edit: action(async function () {
    this.set("isEditing", true);
  }),

  save: action(async function () {
    let band = this.model;
    await band.save();
    this.set("isEditing", false);
  }),
});
