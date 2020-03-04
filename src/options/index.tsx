import xs from "xstream";
import { run } from "@cycle/run";
import { makeDOMDriver, MainDOMSource } from "@cycle/dom";
import Snabbdom from "snabbdom-pragma";
import { OptionsReducerStream, OptionsStream, Options } from "../types";
import createStorageDriver from "../storage/createStorageDriver";
import App from "./widgets/App";
import initOptions from "../storage/initOptions";
import createRule from "./utils/createRule";

const container = document.createElement("div");
document.body.appendChild(container);

const drivers = {
  DOM: makeDOMDriver(container),
  storage: createStorageDriver()
};

interface MainSources {
  DOM: MainDOMSource;
  storage: OptionsStream;
}

const main = ({ storage, DOM }: MainSources) => {
  const DOMSink = storage.map(options => <App options={options} />);
  const storageSink: OptionsReducerStream = xs.merge(
    DOM.select("#checkbox")
      .events("change")
      .map(event => {
        const target = event.currentTarget as HTMLInputElement;
        return (options: Options) => ({
          ...options,
          showNotification: target.checked
        });
      }),
    DOM.select("#reset")
      .events("click")
      .map(() => (window.confirm("Are you sure?") ? () => initOptions : null)),
    DOM.select("#rule-form")
      .events("submit")
      .map(event => {
        event.preventDefault();
        const rule = createRule(event.currentTarget as HTMLFormElement);
        return (options: Options) => {
          const oldRules = options.rules;
          return {
            ...options,
            rules: [...oldRules, rule]
          };
        };
      }),
    DOM.select(".js-button-delete-rule")
      .events("click")
      .map(event => {
        const { dataset } = event.currentTarget as HTMLButtonElement;
        return window.confirm("Are you sure?")
          ? (options: Options): Options => ({
              ...options,
              rules: options.rules.filter(r => r.id !== dataset.id)
            })
          : null;
      })
  );
  return { DOM: DOMSink, storage: storageSink };
};

run(main, drivers);
