import Controller from "@ember/controller";
import { action } from "@ember/object";
import { empty } from "@ember/object/computed";

export default Controller.extend({
  isAddingSong: false,
  newSongTitle: "",
  isAddButtonDisabled: empty("newSongTitle"),

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
      band: this.model,
    });
    await newSong.save();
    this.set("newSongTitle", "");
  }),

  updateRating: action(function (song, rating) {
    song.set("rating", song.rating === rating ? 0 : rating);
    song.save();
  }),
});
