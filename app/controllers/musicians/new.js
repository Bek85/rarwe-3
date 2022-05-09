import Controller from "@ember/controller";
import { task } from "ember-concurrency";
import { inject as service } from "@ember/service";

export default Controller.extend({
  router: service(),

  gotoMusicianDetails: task(function* () {
    yield this.router.transitionTo("musicians.show", this.model.id);
  }),
});
