import Controller from "@ember/controller";
import { action } from "@ember/object";
import { empty, or } from "@ember/object/computed";
import { inject as service } from "@ember/service";
import { task } from "ember-concurrency";

export default Controller.extend({
  router: service(),
  isAddingBand: false,
  newBandName: "",
  hasEmptyName: empty("newBandName"),
  isAddButtonDisabled: or("hasEmptyName", "saveBand.isRunning"),

  addBand: action(function () {
    this.set("isAddingBand", true);
  }),

  cancelAddBand: action(function () {
    this.set("isAddingBand", false);
  }),

  saveBand: task(function* (evt) {
    evt.preventDefault();
    // Create a new band
    // let newBand = Band.create({ name: this.newBandName });
    // this.model.pushObject(newBand);
    let newBand = this.store.createRecord("band", { name: this.newBandName });
    yield newBand.save();
    this.setProperties({
      newBandName: "",
      isAddingBand: false,
    });

    // newBand.set("slug", dasherize(newBand.name));
    this.router.transitionTo("bands.band.songs", newBand.id);
    this.flashMessages.success("The new band has been created");
  }),

  deleteBand: action(async function (band) {
    band.destroyRecord();
  }),
});
