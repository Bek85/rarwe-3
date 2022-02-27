import Route from "@ember/routing/route";

export default Route.extend({
  model({ id }) {
    console.log(id);
    return this.store.findRecord("band", id);
  },
});
