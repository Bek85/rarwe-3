import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";

export default Controller.extend({
  router: service(),

  init() {
    this._super(...arguments);
    this.set("showErrors", { email: false, password: false });
  },

  setShowErrors: action(function (property) {
    let showErrors = { ...this.showErrors };
    showErrors[property] = true;
    this.set("showErrors", showErrors);
  }),

  signUp: action(async function (evt) {
    evt.preventDefault();
    // let { email, password } = this;
    // let user = this.store.createRecord("user", { email, password });
    // await user.save();
    await this.model.save();
    await this.router.transitionTo("login");
  }),
});
