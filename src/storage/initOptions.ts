import {Options} from '../types'
import uuid from 'uuid/v4'

const initOptions: Options = {
  showNotification: false,
  rules: [
    {
      id: uuid(),
      pattern: '*://slack-redir.net/link?*',
      key: 'url',
      template: null,
    },
    {
      id: uuid(),
      pattern: '*://www.google.com/url?*',
      key: 'q',
      template: null,
    },
  ],
}

export default initOptions
