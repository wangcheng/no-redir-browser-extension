import { initStorage, subscribeOptionsChange } from "../storage/helpers";
import { Subscription, Rule, Options } from "../types";

type CallbackDetails =
  chrome.webNavigation.WebNavigationParentedCallbackDetails;

const isValidUrl = (str: string) => {
  try {
    new URL(str);
    return true;
  } catch (e) {
    return false;
  }
};

const createNotification = (message: string) => {
  chrome.notifications.create({
    type: "basic",
    title: "no-redir",
    message,
    iconUrl: "img/icon_awesome_face_600.png",
  });
};

const subscribe = (rules: Rule[], showNotification: boolean): Subscription => {
  const callback = ({ url, tabId }: CallbackDetails) => {
    const { pathname, hostname, searchParams } = new URL(url);
    const rule = rules.find(
      ({ filter }) =>
        filter.hostEquals === hostname && filter.pathEquals === pathname
    );

    if (!rule) return;

    const { key } = rule;

    const redirectUrl = searchParams.get(key);
    if (redirectUrl && isValidUrl(redirectUrl)) {
      chrome.tabs.update(tabId, { url: redirectUrl }, () => {
        if (showNotification) {
          createNotification(redirectUrl);
        }
      });
    }
  };

  chrome.webNavigation.onBeforeNavigate.addListener(callback, {
    url: rules.map((r) => r.filter),
  });

  return {
    unsubscribe: () =>
      chrome.webNavigation.onBeforeNavigate.removeListener(callback),
  };
};

let webNavigationSubscriptions: Subscription;

const updateWebNavigationSubscriptions = (options: Options) => {
  const { rules, showNotification } = options;
  webNavigationSubscriptions?.unsubscribe();
  webNavigationSubscriptions = subscribe(rules, showNotification);
};

const handleStartUp = () => {
  initStorage().then(updateWebNavigationSubscriptions);
  subscribeOptionsChange(updateWebNavigationSubscriptions);
};

handleStartUp();
