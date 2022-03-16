import JSONAPIAdapter from "@ember-data/adapter/json-api";
import DataAdapterMixin from "ember-simple-auth/mixins/data-adapter-mixin";
import { computed } from "@ember/object";

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  headers: computed("session.data.authenticated.token", function () {
    let { token } = this.get("session.data.authenticated");
    let headers = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token};`;
    }
    return headers;
  }),
});
