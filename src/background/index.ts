import rules, {Rule} from './rules'
import {initStorage, getOptions} from '../storage/helpers'

interface Subscription {
  unsubscribe: () => void
}

type CallbackDetails = chrome.webNavigation.WebNavigationParentedCallbackDetails

const subscribe = (
  {filter, key}: Rule,
  showNotification: boolean,
): Subscription => {
  const callback = ({url, tabId, frameId}: CallbackDetails) => {
    const {searchParams} = new URL(url)
    const redirectUrl = searchParams.get(key)
    if (frameId === 0 && redirectUrl) {
      chrome.tabs.update(tabId, {url: redirectUrl}, () => {
        if (showNotification) {
          console.log('redirectUrl', redirectUrl)
        }
      })
    }
  }
  chrome.webNavigation.onBeforeNavigate.addListener(callback, {url: [filter]})

  return {
    unsubscribe: () =>
      chrome.webNavigation.onBeforeNavigate.removeListener(callback),
  }
}

initStorage().then(options => {
  const {showNotification} = options
  let subscriptions = rules.map(rule => subscribe(rule, showNotification))
  chrome.storage.onChanged.addListener(() => {
    subscriptions.forEach(s => s.unsubscribe())
    return getOptions().then(options => {
      if (options) {
        subscriptions = rules.map(rule =>
          subscribe(rule, options.showNotification),
        )
      }
    })
  })
})
