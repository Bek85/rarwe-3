import Controller from "@ember/controller";
import { action } from "@ember/object";
import { empty } from "@ember/object/computed";
import { inject as service } from "@ember/service";

export default Controller.extend({
  router: service(),
  isAddingBand: false,
  newBandName: "",
  isAddButtonDisabled: empty("newBandName"),

  addBand: action(function () {
    this.set("isAddingBand", true);
  }),

  cancelAddBand: action(function () {
    this.set("isAddingBand", false);
  }),

  saveBand: action(async function (evt) {
    evt.preventDefault();
    // Create a new band
    // let newBand = Band.create({ name: this.newBandName });
    // this.model.pushObject(newBand);
    let newBand = this.store.createRecord("band", { name: this.newBandName });
    await newBand.save();
    this.setProperties({
      newBandName: "",
      isAddingBand: false,
    });

    // newBand.set("slug", dasherize(newBand.name));
    this.router.transitionTo("bands.band.songs", newBand.id);
    this.flashMessages.success("The new band has been created");
  }),

  deleteBand: action(async function (band) {
    console.log(band);
    band.destroyRecord();
  }),
});
