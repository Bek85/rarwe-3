import Route from "@ember/routing/route";
import { A } from "@ember/array";
import Band from "rarwe/models/band";
import Song from "rarwe/models/song";

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

    let daughter = Song.create({
      title: "Daughter",
      band: "Pearl, Jam",
      rating: 5,
    });

    let ledZeppelin = Band.create({
      name: "Led Zeppelin",
      slug: "led-zeppelin",
      songs: A([blackDog]),
    });
    let pearlJam = Band.create({
      name: "Pearl Jam",
      slug: "pearl-jam",
      songs: A([yellowLedBetter, daughter]),
    });
    let fooFighters = Band.create({
      name: "Foo Fighters",
      slug: "foo-fighters",
      songs: A([pretender]),
    });

    return A([ledZeppelin, pearlJam, fooFighters]);
  },
});
