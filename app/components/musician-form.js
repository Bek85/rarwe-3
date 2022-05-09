import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { or } from "@ember/object/computed";
import { task } from "ember-concurrency";
import { action } from "@ember/object";

export default Component.extend({
  tagName: "",

  musician: null,
  afterSave: null,
  selectedBands: null,
  store: service(),

  isButtonDisabled: or(
    "musician.validations.isInvalid",
    "saveMusician.isRunning"
  ),

  async init() {
    this._super(...arguments);
    this.set("showErrors", { name: false });
    this.set("bands", await this.store.findAll("band"));
  },

  setShowErrors: action(function (property) {
    let showErrors = { ...this.showErrors };
    showErrors[property] = true;
    this.set("showErrors", showErrors);
  }),

  updateSelectedBands: action(function (bands) {
    this.set("selectedBands", bands);
  }),

  saveMusician: task(function* (evt) {
    evt.preventDefault();
    this.musician.set("bands", this.selectedBands);
    yield this.musician.save();
    yield this.afterSave.perform();
  }),
});
