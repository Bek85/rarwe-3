import EmberObject from "@ember/object";

export default EmberObject.extend({
  name: "",
  description: "",

  init() {
    this._super(...arguments);
    if (!this.songs) {
      this.set("songs", []);
    }
  },
});
