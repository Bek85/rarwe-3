import BaseValidator from "ember-cp-validations/validators/base";

const YearOfFormation = BaseValidator.extend({
  validate(value) {
    if (!value) {
      return true;
    }

    let words = value.split(/\s+/);
    let currentYear = new Date().getFullYear();
    let yearOfFormation = words.find((word) => {
      if (word.match(/\b\4{4}\b/)) {
        let year = parseInt(word, 10);
        return year > 1900 && year <= currentYear;
      }
    });

    return yearOfFormation
      ? true
      : "The year of formation must be included in the description";
  },
});

YearOfFormation.reopenClass({
  /**
   * Define attribute specific dependent keys for your validator
   *
   * [
   * 	`model.array.@each.${attribute}` --> Dependent is created on the model's context
   * 	`${attribute}.isValid` --> Dependent is created on the `model.validations.attrs` context
   * ]
   *
   * @param {String}  attribute   The attribute being evaluated
   * @param {Unknown} options     Options passed into your validator
   * @return {Array}
   */
  getDependentsFor(/* attribute, options */) {
    return [];
  },
});

export default YearOfFormation;
