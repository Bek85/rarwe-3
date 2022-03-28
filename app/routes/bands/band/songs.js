import Route from "@ember/routing/route";

export default Route.extend({
  model() {
    let band = this.modelFor("bands.band");
    return band.store.query("song", {
      filter: {
        band_id: band.id,
      },
    });
    // return reject(this.modelFor('bands.band'));
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set("band", this.modelFor("bands.band"));
  },

  resetController(controller) {
    controller.setProperties({
      isAddingSong: false,
      newSongTitle: "",
    });
  },
});
