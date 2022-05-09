import Controller from "@ember/controller";
import { action } from "@ember/object";

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.set("showErrors", { name: false });
  },

  setShowErrors: action(function (property) {
    let showErrors = { ...this.showErrors };
    showErrors[property] = true;
    this.set("showErrors", showErrors);
  }),
});
