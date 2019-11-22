import uuid from 'uuid/v4'
import {Rule} from '../../types'
import {RuleFormElements} from '../widgets/RuleForm'

export default (form: HTMLFormElement) => {
  const elements = form.elements as RuleFormElements
  const pattern = elements['pattern'].value
  const key = elements['key'].value
  const template = elements['template'].value || null
  const rule: Rule = {
    id: uuid(),
    pattern,
    key,
    template,
  }
  return rule
}
