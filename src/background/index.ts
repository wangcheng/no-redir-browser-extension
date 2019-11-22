import {initStorage, getOptions} from '../storage/helpers'
import {Rule, Options} from '../types'

interface Subscription {
  unsubscribe: () => void
}

const subscribe = (rule: Rule, showNotification: boolean): Subscription => {
  const {pattern, key, template} = rule
  const callback = (details: chrome.webRequest.WebRequestBodyDetails) => {
    const {searchParams} = new URL(details.url)
    const value = searchParams.get(key)
    if (value) {
      const redirectUrl = template ? template.replace('{value}', value) : value
      if (showNotification) {
        chrome.notifications.create({
          type: 'basic',
          title: 'no-redir',
          message: redirectUrl,
          iconUrl: 'img/icon_awesome_face_600.png',
        })
      }
      return {redirectUrl}
    }
  }
  chrome.webRequest.onBeforeRequest.addListener(
    callback,
    {urls: [pattern], types: ['main_frame']},
    ['blocking']
  )

  return {
    unsubscribe: () =>
      chrome.webRequest.onBeforeRequest.removeListener(callback),
  }
}

const subscribeOptions = ({rules, showNotification}: Options) =>
  rules.map(rule => subscribe(rule, showNotification))

chrome.runtime.onInstalled.addListener(() => {
  let subscriptions: Subscription[] = []

  initStorage().then(options => {
    subscriptions = subscribeOptions(options)
  })

  chrome.storage.onChanged.addListener(() => {
    subscriptions.forEach(s => s.unsubscribe())
    subscriptions = []
    getOptions().then(options => {
      if (options) {
        subscriptions = subscribeOptions(options)
      }
    })
  })
})
