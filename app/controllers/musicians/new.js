import Controller from "@ember/controller";
import { action } from "@ember/object";
import { readOnly } from "@ember/object/computed";
import { task } from "ember-concurrency";
import { inject as service } from "@ember/service";

export default Controller.extend({
  router: service(),
  isButtonDisabled: readOnly("model.validations.isInvalid"),
  init() {
    this._super(...arguments);
    this.set("showErrors", { name: false });
  },

  setShowErrors: action(function (property) {
    let showErrors = { ...this.showErrors };
    showErrors[property] = true;
    this.set("showErrors", showErrors);
  }),

  createMusician: task(function* (evt) {
    evt.preventDefault();
    yield this.model.save();
    yield this.router.transitionTo("musicians.show", this.model.id);
  }),
});
