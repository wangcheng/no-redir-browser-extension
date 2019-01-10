import {run} from '@cycle/run'
import {makeDOMDriver, MainDOMSource} from '@cycle/dom'
import Snabbdom from 'snabbdom-pragma'
import {StorageSource} from '../storage/types'
import createStorageDriver from '../storage/createStorageDriver'
import App from './widgets/App'

const container = document.createElement('div')
document.body.appendChild(container)

const drivers = {
  DOM: makeDOMDriver(container),
  storage: createStorageDriver(),
}

interface MainSources {
  DOM: MainDOMSource
  storage: StorageSource
}

const main = ({storage, DOM}: MainSources) => ({
  DOM: storage.map(options => <App options={options} />),
  storage: DOM.select('#checkbox')
    .events('change')
    .map(event => {
      const target = event.currentTarget as HTMLInputElement
      return {showNotification: target.checked}
    }),
})

run(main, drivers)
