import { module, test } from "qunit";
import { visit, fillIn, click, triggerEvent } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";

module("Acceptance | sign up", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test("Successful sign up", async function (assert) {
    await visit("/sign-up");
    await fillIn("#email", "dave@tcv.com");
    await fillIn("#password", "ThemCr00ked!");
    await click("[data-test-rr=sign-up-button]");

    assert
      .dom("[data-test-rr=form-header]")
      .hasText("Log in to R&R", "User is redirected to log in");
  });

  test("sign up client-side errors", async function (assert) {
    await visit("/sign-up");

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
