import JSONAPIAdapter from "@ember-data/adapter/json-api";
import DataAdapterMixin from "ember-simple-auth/mixins/data-adapter-mixin";
import { computed } from "@ember/object";
import ENV from "rarwe/config/environment";

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV.apiHost,
  headers: computed("session.data.authenticated.token", function () {
    let { token } = this.get("session.data.authenticated");
    let headers = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token};`;
    }
    return headers;
  }),
});
