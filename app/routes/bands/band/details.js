import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default Route.extend({
  router: service(),

  init() {
    this._super();
    this.router.on("routeWillChange", (transition) => {
      if (!transition.from) {
        return;
      }

      if (transition.to.name === transition.from.name) {
        return;
      }

      let controller = this.controller;
      if (controller && controller.isEditing) {
        let leave = window.confirm("Are you sure?");
        if (!leave) {
          transition.abort();
        } else {
          controller.set("isEditing", false);
        }
      }
    });
  },

  model() {
    return this.modelFor("bands.band");
  },
});
