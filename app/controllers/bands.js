import Controller from "@ember/controller";
import { action } from "@ember/object";
import { empty } from "@ember/object/computed";
import Band from "rarwe/models/band";

export default Controller.extend({
  isAddingBand: false,
  newBandName: "",
  isAddButtonDisabled: empty("newBandName"),

  addBand: action(function () {
    this.set("isAddingBand", true);
  }),

  cancelAddBand: action(function () {
    this.set("isAddingBand", false);
  }),

  saveBand: action(function (evt) {
    evt.preventDefault();
    // Create a new band
    let newBand = Band.create({ name: this.newBandName });
    this.model.pushObject(newBand);
    this.set("newBandName", "");
  }),
});
