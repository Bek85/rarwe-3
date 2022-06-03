import Component from "@ember/component";
import { or } from "@ember/object/computed";
import { action } from "@ember/object";

export default Component.extend({
  tagName: "",
  band: null,
  isButtonDisabled: or("band.validations.isInvalid", "saveBand.isRunning"),

  setShowErrors: action(function (property) {
    let showErrors = { ...this.showErrors };
    showErrors[property] = true;
    this.set("showErrors", showErrors);
  }),

  init() {
    this._super(...arguments);
    this.set("showErrors", {
      name: false,
      description: false,
    });
  },
});
