import { initStorage, subscribeOptionsChange } from "../storage/helpers";
import { Subscription, Rule, Options } from "../types";
import { browser, WebNavigation } from "webextension-polyfill-ts";

const isValidUrl = (str: string) => {
  try {
    new URL(str);
    return true;
  } catch (e) {
    return false;
  }
};

const createNotification = (message: string) => {
  browser.notifications.create({
    type: "basic",
    title: "no-redir",
    message,
    iconUrl: "img/icon_awesome_face_600.png",
  });
};

const subscribe = (rule: Rule, showNotification: boolean): Subscription => {
  const { filter, key } = rule;

  const callback = ({
    url,
    tabId,
  }: WebNavigation.OnBeforeNavigateDetailsType) => {
    const { searchParams } = new URL(url);
    const redirectUrl = searchParams.get(key);
    if (redirectUrl && isValidUrl(redirectUrl)) {
      browser.tabs.update(tabId, { url: redirectUrl }).then(() => {
        if (showNotification) {
          createNotification(redirectUrl);
        }
      });
    }
  };

  browser.webNavigation.onBeforeNavigate.addListener(callback, {
    url: [filter],
  });

  return {
    unsubscribe: () =>
      browser.webNavigation.onBeforeNavigate.removeListener(callback),
  };
};

let webNavigationSubscriptions: Subscription[] = [];

const updateWebNavigationSubscriptions = (options: Options) => {
  const { rules, showNotification } = options;
  webNavigationSubscriptions.forEach((s) => s.unsubscribe());
  webNavigationSubscriptions = rules.map((rule) =>
    subscribe(rule, showNotification)
  );
};

const handleStartUp = () => {
  initStorage().then(updateWebNavigationSubscriptions);
  subscribeOptionsChange(updateWebNavigationSubscriptions);
};

handleStartUp();
