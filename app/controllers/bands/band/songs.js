import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action, computed } from "@ember/object";
import { empty, gt, or } from "@ember/object/computed";
import { capitalize } from "rarwe/helpers/capitalize";
import { task, timeout } from "ember-concurrency";

export default Controller.extend({
  router: service(),
  pageNumber: 1,

  isAddingSong: false,
  newSongTitle: "",
  hasEmptyName: empty("newSongTitle"),
  isAddButtonDisabled: or("hasEmptyName", "saveSong.isRunning"),
  sortBy: "title",
  // searchTermQP: "",
  hasPrevPage: gt("pageNumber", 1),
  hasNextPage: computed("pageNumber", "model.meta.page-count", function () {
    return this.pageNumber < this.model.meta["page-count"];
  }),

  newSongPlaceholder: computed("band.name", function () {
    let bandName = this.band.name;
    return `New ${capitalize(bandName)} song`;
  }),

  // matchingSongs: computed("model.@each.title", "searchTerm", function () {
  //   let searchTerm = this.searchTerm.toLowerCase();
  //   return this.model.filter((song) =>
  //     song.title.toLowerCase().includes(searchTerm)
  //   );
  // }),

  // sortProperties: computed("sortBy", function () {
  //   let options = {
  //     ratingDesc: ["rating:desc", "title:asc"],
  //     ratingAsc: ["rating:asc", "title:asc"],
  //     titleDesc: ["title:desc"],
  //     titleAsc: ["title:asc"],
  //   };
  //   return options[this.sortBy];
  // }),

  // sortedSongs: sort("matchingSongs", "sortProperties"),

  // updateSortBy: action(function (sortBy) {
  //   this.set("sortBy", sortBy);
  // }),

  updateSearchTerm: task(function* (evt) {
    if (evt) {
      yield timeout(250);
      this.set("searchTerm", evt.target.value);
    }
    yield this.router.transitionTo({
      queryParams: {
        q: this.searchTerm,
        page: 1,
      },
    });
  }).restartable(),

  addSong: action(function () {
    this.set("isAddingSong", true);
  }),

  cancelAddSong: action(function () {
    this.set("isAddingSong", false);
  }),

  saveSong: task(function* (evt) {
    evt.preventDefault();
    // Create a new song
    // let newSong = Song.create({ title: this.newSongTitle });
    // this.model.songs.pushObject(newSong);
    let newSong = this.store.createRecord("song", {
      title: this.get("newSongTitle"),
      band: this.band,
    });
    yield newSong.save();
    this.model.update();
    this.set("newSongTitle", "");
    this.flashMessages.success("The new song has been created");
  }),

  updateRating: action(function (song, rating) {
    song.set("rating", song.rating === rating ? 0 : rating);
    song.save();
  }),
});
