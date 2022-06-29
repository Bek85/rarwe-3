import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { readOnly, equal } from "@ember/object/computed";
import { task } from "ember-concurrency";
import { computed } from "@ember/object";

export default Controller.extend({
  showingAll: equal("showConcerts", "all"),
  showingNearby: equal("showConcerts", "nearby"),

  showConcerts: "all",

  geolocation: service(),
  userLocation: readOnly("geolocation.currentLocation"),

  filterConcerts: task(function* () {
    if (!this.userLocation) {
      yield this.get("geolocation").getLocation();
    }
    this.set("showConcerts", this.showingAll ? "nearby" : "all");
  }),

  concerts: computed("showingAll", "model.[]", function () {
    if (this.showingAll === "all") {
      return this.model;
    }

    return this.model.slice(0, -1);
  }),
});
