import { Options } from "../types";
import uuid from "uuid/v4";

const initOptions: Options = {
  showNotification: false,
  rules: [
    {
      id: uuid(),
      filter: {
        hostEquals: "slack-redir.net",
        pathEquals: "/link"
      },
      key: "url"
    },
    {
      id: uuid(),
      filter: {
        hostEquals: "www.google.com",
        pathEquals: "/url"
      },
      key: "q"
    }
  ]
};

export default initOptions;
