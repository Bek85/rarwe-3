import Route from "@ember/routing/route";

export default Route.extend({
  model({ slug }) {
    let bands = this.modelFor("bands");
    console.log(slug);
    return bands.find((band) => band.slug === slug);
  },
});
