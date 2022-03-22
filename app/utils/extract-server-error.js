import { capitalize } from "@ember/string";

const generalErrorMessage = "Something went wrong, sorry";

export default function extractServerError(errors) {
  if (!errors) {
    return generalErrorMessage;
  }

  let [errorObject] = errors;
  let { title, detail, source } = errorObject;
  if (!source) {
    return generalErrorMessage;
  }

  let { pointer } = source;
  let attributePath = pointer.split("/");
  let errorAttribute = attributePath[attributePath.length - 1];
  return errorAttribute === "base"
    ? detail
    : `${capitalize(errorAttribute)} ${title}`;
}
