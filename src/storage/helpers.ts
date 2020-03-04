import { Subscription, Options, StorageShape } from "../types";
import initOptions from "./initOptions";

const KEY = "options";

export function getOptions(): Promise<Options | undefined> {
  return new Promise(resolve =>
    chrome.storage.sync.get(KEY, (v: StorageShape) => resolve(v.options))
  );
}

export function setOptions(newValue: Options): Promise<Options> {
  return new Promise(resolve =>
    chrome.storage.sync.set({ [KEY]: newValue }, () => resolve(newValue))
  );
}

export function initStorage() {
  return getOptions().then(value =>
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

  chrome.storage.onChanged.addListener(callback);

  return {
    unsubscribe: () => chrome.storage.onChanged.removeListener(callback)
  };
}
