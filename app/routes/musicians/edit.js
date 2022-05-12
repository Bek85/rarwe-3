import Route from "@ember/routing/route";

export default Route.extend({
  model({ id }) {
    return this.store.findRecord("musician", id, { include: "bands" });
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set("selectedBands", model.get("bands"));
  },
});
