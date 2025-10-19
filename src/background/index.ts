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
    iconUrl: "/img/icon_awesome_face_600.png",
  });
};

const subscribe = (rules: Rule[], showNotification: boolean): Subscription => {
  const callback = ({ url, tabId }: CallbackDetails) => {
    for (const { key } of rules) {
      const { searchParams } = new URL(url);
      const redirectUrl = searchParams.get(key);
      if (redirectUrl && isValidUrl(redirectUrl)) {
        chrome.tabs.update(tabId, { url: redirectUrl }, () => {
          if (showNotification) {
            createNotification(redirectUrl);
          }
        });
        break;
      }
    }
  };

  const filters = rules.map(({ filter }) => filter);

  chrome.webNavigation.onBeforeNavigate.addListener(callback, { url: filters });

  return {
    unsubscribe: () =>
      chrome.webNavigation.onBeforeNavigate.removeListener(callback),
  };
};

let webNavigationSubscription: Subscription | null = null;

const updateWebNavigationSubscriptions = (options: Options) => {
  const { rules, showNotification } = options;
  webNavigationSubscription?.unsubscribe();
  webNavigationSubscription = subscribe(rules, showNotification);
};

const handleStartUp = () => {
  initStorage().then(updateWebNavigationSubscriptions);
  subscribeOptionsChange(updateWebNavigationSubscriptions);
};

handleStartUp();
