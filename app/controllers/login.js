import Controller from "@ember/controller";
import { buildValidations } from "ember-cp-validations";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { task } from "ember-concurrency";
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

  signIn: task(function* (evt) {
    evt.preventDefault();
    let { email, password } = this;
    yield this.session.authenticate(
      "authenticator:credentials",
      email,
      password
    );
    yield this.router.transitionTo("bands");
  }),
});
