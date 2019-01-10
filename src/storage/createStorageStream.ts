import xs, {Listener} from 'xstream'
import {Options} from './types'
import {getOptions, initStorage} from './helpers'

const noop = () => {}

export default function createStorageStream() {
  let onStop = noop

  const start = (listener: Listener<Options>) => {
    initStorage().then(value => listener.next(value))
    const callback = () => getOptions().then(value => listener.next(value!))
    chrome.storage.onChanged.addListener(callback)
    onStop = () => chrome.storage.onChanged.removeListener(callback)
  }

  const stop = () => onStop()

  return xs.create({start, stop})
}
