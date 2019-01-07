import rules, {Rule} from './rules'

interface Subscription {
  unsubscribe: () => void
}

type CallbackDetails = chrome.webNavigation.WebNavigationParentedCallbackDetails

const subscribe = ({filter, key}: Rule): Subscription => {
  const callback = ({url, tabId, frameId}: CallbackDetails) => {
    const {searchParams} = new URL(url)
    const redirectUrl = searchParams.get(key)
    if (frameId === 0 && redirectUrl) {
      chrome.tabs.update(tabId, {url: redirectUrl})
    }
  }
  chrome.webNavigation.onBeforeNavigate.addListener(callback, {url: [filter]})

  return {
    unsubscribe: () =>
      chrome.webNavigation.onBeforeNavigate.removeListener(callback),
  }
}

rules.map(rule => subscribe(rule))
