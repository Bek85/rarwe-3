import JSONAPISerializer from "@ember-data/serializer/json-api";

export default JSONAPISerializer.extend({
  extractAttributes(modelClass, resourceHash) {
    let { modelName } = modelClass;
    let extracted = this._super(...arguments);

    if (modelName === "musician") {
      let birthDate = resourceHash.attributes["birth-date"];
      if (birthDate) {
        extracted.yearOfBirth = new Date(birthDate).getFullYear();
      }
    }
    return extracted;
  },

  serialize(snapshot) {
    let json = this._super(...arguments);
    // console.log(json);
    if (snapshot.modelName !== "musician") {
      return json;
    }

    let yob = snapshot.attributes().yearOfBirth;
    json.data.attributes["birth-date"] = `${yob}-01-01`;
    delete json.data.attributes["year-of-birth"];
    return json;
  },
});
