import { Options } from "../types";

const initOptions: Options = {
  showNotification: false,
  rules: [
    {
      id: crypto.randomUUID(),
      filter: {
        hostEquals: "slack-redir.net",
        pathEquals: "/link",
      },
      key: "url",
    },
    {
      id: crypto.randomUUID(),
      filter: {
        hostEquals: "www.google.com",
        pathEquals: "/url",
      },
      key: "q",
    },
  ],
};

export default initOptions;
