import Controller from "@ember/controller";
import { action, computed } from "@ember/object";
import { empty, sort } from "@ember/object/computed";
import { capitalize } from "rarwe/helpers/capitalize";

export default Controller.extend({
  queryParams: {
    sortBy: "s",
    searchTerm: "q",
  },

  isAddingSong: false,
  newSongTitle: "",
  isAddButtonDisabled: empty("newSongTitle"),
  sortBy: "ratingDesc",
  searchTerm: "",

  newSongPlaceholder: computed("model.name", function () {
    let bandName = this.band.name;
    return `New ${capitalize(bandName)} song`;
  }),

  matchingSongs: computed("model.@each.title", "searchTerm", function () {
    let searchTerm = this.searchTerm.toLowerCase();
    return this.model.filter((song) =>
      song.title.toLowerCase().includes(searchTerm)
    );
  }),

  sortProperties: computed("sortBy", function () {
    let options = {
      ratingDesc: ["rating:desc", "title:asc"],
      ratingAsc: ["rating:asc", "title:asc"],
      titleDesc: ["title:desc"],
      titleAsc: ["title:asc"],
    };
    return options[this.sortBy];
  }),

  sortedSongs: sort("matchingSongs", "sortProperties"),

  // updateSortBy: action(function (sortBy) {
  //   this.set("sortBy", sortBy);
  // }),

  addSong: action(function () {
    this.set("isAddingSong", true);
  }),

  cancelAddSong: action(function () {
    this.set("isAddingSong", false);
  }),

  saveSong: action(async function (evt) {
    evt.preventDefault();
    // Create a new song
    // let newSong = Song.create({ title: this.newSongTitle });
    // this.model.songs.pushObject(newSong);
    let newSong = this.store.createRecord("song", {
      title: this.get("newSongTitle"),
      band: this.band,
    });
    await newSong.save();
    this.set("newSongTitle", "");
  }),

  updateRating: action(function (song, rating) {
    song.set("rating", song.rating === rating ? 0 : rating);
    song.save();
  }),
});
