import Model, { attr, hasMany } from "@ember-data/model";
import { computed } from "@ember/object";
import { buildValidations, validator } from "ember-cp-validations";

const Validations = buildValidations({
  name: [
    validator("presence", {
      presence: true,
      ignoreBlank: true,
      message: "Name can't be empty",
    }),
  ],
  description: [
    validator("length", {
      min: 12,
      message: "The description needs to be at least 12 characters",
    }),
    validator("year-of-formation"),
  ],
});

export default Model.extend(Validations, {
  name: attr(),
  description: attr(),
  songs: hasMany(),
  members: hasMany("musicians", { async: false }),

  isGreatBand: computed("songs.@each.rating", function () {
    let goodSongs = this.get("songs").filter((song) => song.rating >= 4);
    return goodSongs.length >= 2;
  }),
});
