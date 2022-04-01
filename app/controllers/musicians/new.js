import Controller from "@ember/controller";
import { action } from "@ember/object";
import { readOnly } from "@ember/object/computed";

export default Controller.extend({
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
});
