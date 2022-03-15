import { module, test } from "qunit";
import { visit, fillIn, click } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";

module("Acceptance | login", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test("Log in with valid credentials", async function (assert) {
    let email = "dave@tcv.com";
    let password = "ThemCr00ked!";
    this.server.create("user", { email, password });

    await visit("/login");

    await fillIn("#email", email);
    await fillIn("#password", password);
    await click("[data-test-rr=login-button]");

    assert
      .dom("[data-test-rr=bands-empty-message]")
      .hasText(
        "Let's start by creating a band.",
        "A descriptive empty message is shown"
      );
  });
});
