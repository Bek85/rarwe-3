import Route from "@ember/routing/route";

export default Route.extend({
  queryParams: {
    sortBy: { as: "s", refreshModel: true },
    searchTerm: { as: "q", refreshModel: true },
    pageNumber: { as: "page", refreshModel: true },
  },

  model({ pageNumber, sortBy, searchTerm }) {
    let band = this.modelFor("bands.band");
    return band.store.query("song", {
      filter: {
        band_id: band.id,
        title: searchTerm,
      },
      "page[number]": pageNumber,
      sort: sortBy,
    });
    // return reject(this.modelFor('bands.band'));
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set("band", this.modelFor("bands.band"));
    // controller.set("searchTerm", controller.searchTermQP);
  },

  resetController(controller) {
    controller.setProperties({
      isAddingSong: false,
      newSongTitle: "",
    });
  },
});
