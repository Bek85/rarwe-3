import Route from "@ember/routing/route";
import EmberObject from "@ember/object";
import { A } from "@ember/array";

let Song = EmberObject.extend({
  title: "",
  band: "",
  rating: 0,
});

export default Route.extend({
  model() {
    let blackDog = Song.create({
      title: "Black Dog",
      band: "Led Zeppelin",
      rating: 3,
    });

    let yellowLedBetter = Song.create({
      title: "Yellow LedBetter",
      band: "Pearl Jam",
      rating: 4,
    });

    let pretender = Song.create({
      title: "The Pretender",
      band: "Foo Fighter",
      rating: 2,
    });

    return A([blackDog, yellowLedBetter, pretender]);
  },
});
