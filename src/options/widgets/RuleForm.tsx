import Snabbdom from 'snabbdom-pragma'

interface InputProps {
  label: string
  id: string
  required?: boolean
  placeholder: string
}

const Input = ({label, ...props}: InputProps) => (
  <div className="four columns">
    <label htmlFor={props.id}>{label}</label>
    <input type="text" spellcheck={false} className="u-full-width" {...props} />
  </div>
)

export default () => (
  <form id="rule-form" autocomplete="off" autocapitalize="none">
    <h5>Add a Rule</h5>
    <div className="row">
      <Input
        label="pattern"
        id="pattern"
        required
        placeholder="*://weibointl.api.weibo.cn/share/*?*"
      />
      <Input label="key" id="key" required placeholder="weibo_id" />
      <Input
        label="template"
        id="template"
        placeholder="https://m.weibo.cn/status/{value}"
      />
    </div>
    <div className="row">
      <button type="submit" className="u-pull-right button-primary">
        Submit
      </button>
      <button type="reset" className="u-pull-left">
        Reset
      </button>
    </div>
  </form>
)

export interface RuleFormElements extends HTMLFormControlsCollection {
  pattern: HTMLInputElement
  key: HTMLInputElement
  template: HTMLInputElement
}
