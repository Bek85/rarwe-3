import JSONAPISerializer from "@ember-data/serializer/json-api";

export default JSONAPISerializer.extend({
  extractAttributes(modelClass, resourceHash) {
    let { modelName } = modelClass;
    let extracted = this._super(...arguments);
    // console.log(extracted);
    if (modelName === "musician") {
      let birthDate = resourceHash.attributes["birth-date"];
      if (birthDate) {
        extracted.yearOfBirth = new Date(birthDate).getFullYear();
      }
    }
    return extracted;
  },
});
