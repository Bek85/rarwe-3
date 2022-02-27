import Model, { attr, belongsTo } from "@ember-data/model";

export default Model.extend({
  title: attr(),
  rating: attr("number"),
  band: belongsTo(),
});
