import Controller from "@ember/controller";
import { buildValidations } from "ember-cp-validations";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import emailField from "rarwe/validations/email-field";
import passwordField from "rarwe/validations/password-field";

const Validations = buildValidations({
  email: emailField,
  password: passwordField,
});

export default Controller.extend(Validations, {
  router: service(),
  session: service(),

  init() {
    this._super(...arguments);
    this.set("showErrors", { email: false, password: false });
  },

  setShowErrors: action(function (property) {
    let showErrors = { ...this.showErrors };
    showErrors[property] = true;
    this.set("showErrors", showErrors);
  }),

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
