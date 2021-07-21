import Snabbdom from "snabbdom-pragma";
import { MainDOMSource } from "@cycle/dom";

export default () => (
  <form id="smart-url-parse-form" autocomplete="off" autocapitalize="none">
    <h5>Parse URL</h5>
    <div>
      <label htmlFor="url">{URL}</label>
      <input
        type="text"
        id="url"
        required
        spellcheck={false}
        className="u-full-width"
        placeholder="example: http://link.zhihu.com/?target=http%3A//evil.gua-le-ni.com/"
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
);

export interface SmartUrlParserFormElements extends HTMLFormControlsCollection {
  url: HTMLInputElement;
}

export function select(DOM: MainDOMSource): MainDOMSource {
  return DOM.select("#smart-url-parse-form");
}
