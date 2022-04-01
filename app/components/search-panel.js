import Component from "@ember/component";

export default Component.extend({
  classNames: ["rr-search-panel"],
  value: "",
  onChange: null,

  didInsertElement() {
    this._super(...arguments);
    this.element.querySelector("input[type=text]").focus();
  },
});
