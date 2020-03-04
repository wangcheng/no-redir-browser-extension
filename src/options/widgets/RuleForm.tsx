import Snabbdom from "snabbdom-pragma";

interface InputProps {
  label: string;
  id: string;
  pattern: string;
  placeholder: string;
}
const Input = ({ label, ...props }: InputProps) => (
  <div className="four columns">
    <label htmlFor={props.id}>{label}</label>
    <input
      type="text"
      required
      spellcheck={false}
      className="u-full-width"
      {...props}
    />
  </div>
);

export default () => (
  <form id="rule-form" autocomplete="off" autocapitalize="none">
    <h5>Add a Rule</h5>
    <div className="row">
      <Input
        label="hostEquals"
        id="host-equals"
        pattern="[\w\-\.]+"
        placeholder="example: www.google.com"
      />
      <Input
        label="pathEquals"
        id="path-equals"
        pattern="[\w\-\/]+"
        placeholder="example: /url"
      />
      <Input label="key" id="key" pattern="[\w\-]+" placeholder="example: q" />
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
);

export interface RuleFormElements extends HTMLFormControlsCollection {
  "host-equals": HTMLInputElement;
  "path-equals": HTMLInputElement;
  key: HTMLInputElement;
}
