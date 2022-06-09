import Route from "@ember/routing/route";
import fetch from "fetch";
import { inject as service } from "@ember/service";
import ENV from "rarwe/config/environment";

console.log(ENV.apiHost);

export default Route.extend({
  session: service(),

  async model() {
    let band = this.modelFor("bands.band");

    let { token } = this.get("session.data.authenticated");

    let concertsURL = `/bands/${band.id}/concerts`;
    if (ENV.apiHost) {
      concertsURL = `${ENV.apiHost}/${concertsURL}`;
    }
    let response = await fetch(concertsURL, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return await response.json();
  },
});
