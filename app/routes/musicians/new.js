import Route from "@ember/routing/route";

export default Route.extend({
  queryParams: {
    bandId: {
      as: "band",
    },
  },

  model() {
    return this.store.createRecord("musician");
  },

  async setupController(controller) {
    this._super(...arguments);
    let { bandId } = controller;
    if (bandId) {
      let selectedBand = await this.store.findRecord("band", bandId);
      controller.set("selectedBand", [selectedBand]);
    }
  },
});
