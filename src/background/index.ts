import { initStorage, subscribeOptionsChange } from "../storage/helpers";
import { Subscription, Options } from "../types";
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

type OnBeforeNavigateDetailsType = WebNavigation.OnBeforeNavigateDetailsType;

const subscribe = ({ rules, showNotification }: Options): Subscription => {
  const callback = ({ url, tabId }: OnBeforeNavigateDetailsType) => {
    const { hostname, pathname, searchParams } = new URL(url);
    const foundRule = rules.find(({ filter }) => {
      return filter.hostEquals === hostname && filter.pathEquals === pathname;
    });
    if (!foundRule) return;
    const redirectUrl = searchParams.get(foundRule.key);
    if (redirectUrl && isValidUrl(redirectUrl)) {
      browser.tabs.update(tabId, { url: redirectUrl }).then(() => {
        if (showNotification) {
          createNotification(redirectUrl);
        }
      });
    }
  };

  browser.webNavigation.onBeforeNavigate.addListener(callback, {
    url: rules.map(({ filter }) => filter),
  });

  return {
    unsubscribe: () =>
      browser.webNavigation.onBeforeNavigate.removeListener(callback),
  };
};

let webNavigationSubscription: Subscription;

const updateWebNavigationSubscriptions = (options: Options) => {
  if (webNavigationSubscription) {
    webNavigationSubscription.unsubscribe();
  }
  webNavigationSubscription = subscribe(options);
};

const handleStartUp = () => {
  initStorage().then(updateWebNavigationSubscriptions);
  subscribeOptionsChange(updateWebNavigationSubscriptions);
};

handleStartUp();
