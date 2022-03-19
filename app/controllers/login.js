import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";

export default Controller.extend({
  router: service(),
  session: service(),

  signIn: action(async function (evt) {
    evt.preventDefault();
    let { email, password } = this;
    await this.session.authenticate(
      "authenticator:credentials",
      email,
      password
    );
    await this.router.transitionTo("bands");
  }),
});
