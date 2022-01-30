import Controller from "@ember/controller";
import { action } from "@ember/object";

export default Controller.extend({
  isAddingBand: false,
  newBandName: "",

  addBand: action(function () {
    this.set("isAddingBand", true);
  }),

  cancelAddBand: action(function () {
    this.set("isAddingBand", false);
  }),

  saveBand: action(function () {
    // Create a new band
  }),
});
