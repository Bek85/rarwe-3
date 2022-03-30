import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default Controller.extend({
  router: service(),

  deleteBand: action(async function (band) {
    band.destroyRecord();
    this.router.transitionTo("bands");
  }),
});
