import Snabbdom from 'snabbdom-pragma'
import {Options} from '../../storage/types'

interface AppProps {
  options: Options
}

export default ({options}: AppProps) => (
  <label>
    <input type="checkbox" id="checkbox" />
    显示通知{String(options.showNotification)}
  </label>
)
