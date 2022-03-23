import Base from "ember-simple-auth/authenticators/base";
import fetch from "fetch";
import ENV from "rarwe/config/environment";

export default Base.extend({
  async restore(data) {
    return data;
  },

  async authenticate(username, password) {
    let tokenURL = ENV.apiHost ? `${ENV.apiHost}/token` : "/token";
    let response = await fetch(tokenURL, {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      // try {
      let error = await response.json();
      throw error;
      // } catch (error) {}
      // return;
    }

    let { user_email: userEmail, token } = await response.json();
    return { userEmail, token };
  },

  async invalidate(data) {
    return data;
  },
});
