import { Rule } from "../../types";

export default ({ filter, key }: Rule, url?: string) =>
  `https://${filter.hostEquals}${filter.pathEquals}?${key}=${url ? encodeURIComponent(url) : "{URL}"}`;
