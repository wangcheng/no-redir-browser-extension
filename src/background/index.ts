import rules from './rules'
import {Rule} from '../types'

interface Subscription {
  unsubscribe: () => void
}

const subscribe = ({filter, key}: Rule): Subscription => {
  const callback = ({
    url,
    tabId,
    frameId,
  }: chrome.webNavigation.WebNavigationParentedCallbackDetails) => {
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
