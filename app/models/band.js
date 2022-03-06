import Model, { attr, hasMany } from "@ember-data/model";
import { computed } from "@ember/object";

export default Model.extend({
  name: attr(),
  description: attr(),
  songs: hasMany(),

  isGreatBand: computed("songs.@each.rating", function () {
    let goodSongs = this.get("songs").filter((song) => song.rating >= 4);
    return goodSongs.length >= 2;
  }),
});
