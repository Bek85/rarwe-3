import Component from "@ember/component";
import { or } from "@ember/object/computed";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { task } from "ember-concurrency";

export default Component.extend({
  router: service(),
  tagName: "",
  band: null,
  isButtonDisabled: or("band.validations.isInvalid", "saveBand.isRunning"),

  init() {
    this._super(...arguments);
    this.set("showErrors", {
      name: false,
      description: false,
    });
  },

  setShowErrors: action(function (property) {
    let showErrors = { ...this.showErrors };
    showErrors[property] = true;
    this.set("showErrors", showErrors);
  }),

  saveBand: task(function* (evt) {
    evt.preventDefault();
    yield this.band.save();
    yield this.router.transitionTo("bands.band.details", this.band.id);
  }),

  discardChanges: task(function* () {
    this.band.rollbackAttributes();
    yield this.router.transitionTo("bands.band.details", this.band.id);
  }),
});
