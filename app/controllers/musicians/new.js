import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { task } from "ember-concurrency";

export default Controller.extend({
  router: service(),

  goToMusicianDetails: task(function* () {
    yield this.router.transitionTo("musicians.show", this.model.id);
  }),
});
