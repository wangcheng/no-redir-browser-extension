import {initStorage, getOptions} from '../storage/helpers'
import {Rule, Options} from '../types'

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

const subscribeOptions = ({rules, showNotification}: Options) =>
  rules.map(rule => subscribe(rule, showNotification))

initStorage().then(options => {
  let subscriptions = subscribeOptions(options)
  chrome.storage.onChanged.addListener(() => {
    subscriptions.forEach(s => s.unsubscribe())
    subscriptions = []
    getOptions().then(newOptions => {
      if (newOptions) {
        subscriptions = subscribeOptions(newOptions)
      }
    })
  })
})
