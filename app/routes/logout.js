import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default Route.extend({
  router: service(),
  session: service(),

  beforeModel() {
    this.session.invalidate();
    this.router.transitionTo("login");
  },
});
