import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import extractServerError from "rarwe/utils/extract-server-error";
import { task } from "ember-concurrency";

export default Controller.extend({
  router: service(),

  init() {
    this._super(...arguments);
    this.set("showErrors", { email: false, password: false });
    this.set("baseErrors", []);
  },

  resetBaseErrors: action(function () {
    this.set("baseErrors", []);
  }),

  setShowErrors: action(function (property) {
    let showErrors = { ...this.showErrors };
    showErrors[property] = true;
    this.set("showErrors", showErrors);
  }),

  signUp: task(function* (evt) {
    evt.preventDefault();

    try {
      yield this.model.save();
      yield this.router.transitionTo("login");
    } catch (response) {
      let errorMessage = extractServerError(response.errors);
      this.baseErrors.pushObject(errorMessage);
    }

    // let { email, password } = this;
    // let user = this.store.createRecord("user", { email, password });
    // await user.save();
  }),
});
