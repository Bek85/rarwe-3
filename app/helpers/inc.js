import { helper } from "@ember/component/helper";

export default helper(function inc(params) {
  let [n] = params;
  return Number.parseInt(n, 10) + 1;
});
