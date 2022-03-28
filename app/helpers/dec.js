import { helper } from "@ember/component/helper";

export default helper(function dec(params) {
  let [n] = params;
  return Number.parseInt(n, 10) - 1;
});
