import Controller from "@ember/controller";
import { action } from "@ember/object";
import Band from "rarwe/models/band";

export default Controller.extend({
  isEditing: false,
  description: "",

  // saveDescription: action(function () {

  //   this.set("isEditing", true);
  //   let newDescription = Band.create({ description: this.description });
  //   console.log(newDescription);

  //   this.model.pushObject(newDescription);
  //   this.setProperties({
  //     isEditing: false,
  //     // description: "",
  //   });
  // }),
});
