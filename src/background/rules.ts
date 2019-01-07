import {Rule} from '../types'

const rules: Rule[] = [
  {
    filter: {
      hostEquals: 'slack-redir.net',
      pathEquals: '/link',
    },
    key: 'url',
  },
  {
    filter: {
      hostEquals: 'link.zhihu.com',
      pathEquals: '/',
    },
    key: 'target',
  },
]

export default rules
