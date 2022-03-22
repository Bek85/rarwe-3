import { module, test } from "qunit";
import {
  visit,
  fillIn,
  click,
  currentURL,
  triggerEvent,
} from "@ember/test-helpers";
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
    await click("[data-test-rr=login-button");

    assert.equal(currentURL(), "/bands");
    assert
      .dom("[data-test-rr=bands-empty-message]")
      .hasText(
        "Let's start by creating a band.",
        "A descriptive empty message is shown"
      );
    assert
      .dom("[data-test-rr=user-email]")
      .hasText("dave@tcv.com", "The logged in user's email is shown");
    // await pauseTest();
    await click("[data-test-rr=logout]");

    // assert.dom("[data-test-rr=form-header]").hasText("Log in to R&R");
    assert.dom("[data-test-rr=user-email]").doesNotExist();
  });

  test("Login client-side errors", async function (assert) {
    await visit("/login");

    await fillIn("#email", "dave#tcv.com");
    await triggerEvent("#email", "blur");
    assert
      .dom("[data-test-rr=email-error]")
      .hasText("Email should be a valid email", "Email error is displayed");

    await fillIn("#password", "crooked");
    await triggerEvent("#password", "blur");
    assert
      .dom("[data-test-rr=password-error]")
      .hasText(
        "Password should be at least 8 characters",
        "Password error is displayed"
      );

    await fillIn("#email", "dave@tcv.com");
    assert
      .dom("[data-test-rr=email-error]")
      .hasText("", "Email error is no longer displayed");

    await fillIn("#password", "ThemCr00ked!");
    assert
      .dom("[data-test-rr=password-error]")
      .hasText("", "Password error is no longer displayed");
  });
});
