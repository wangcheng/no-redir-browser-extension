import { Subscription, Options, StorageShape } from "../types";
import initOptions from "./initOptions";
import { browser } from "webextension-polyfill-ts";

const KEY = "options";

export function getOptions(): Promise<Options | undefined> {
  return browser.storage.sync.get(KEY).then((v: StorageShape) => v.options);
}

export function setOptions(newValue: Options): Promise<Options> {
  return browser.storage.sync.set({ [KEY]: newValue }).then(() => newValue);
}

export function initStorage() {
  return getOptions().then((value) =>
    value ? Promise.resolve(value) : setOptions(initOptions)
  );
}

interface Change<T> {
  oldValue: T;
  newValue: T;
}

type ChangeHandler = (value: Options) => void;

export function subscribeOptionsChange(onChange: ChangeHandler): Subscription {
  const callback = (change: any, namespace: string) => {
    const optionsChange = change[KEY] as Change<Options> | undefined;
    if (optionsChange && namespace == "sync") {
      onChange(optionsChange.newValue);
    }
  };

  browser.storage.onChanged.addListener(callback);

  return {
    unsubscribe: () => browser.storage.onChanged.removeListener(callback),
  };
}
