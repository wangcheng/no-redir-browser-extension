import { Rule } from "../../types";

export default ({ filter, key }: Rule) =>
  `https://${filter.hostEquals}${filter.pathEquals}?${key}={URL}`;
