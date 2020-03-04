import { Options, StorageShape } from "../types";
import initOptions from "./initOptions";

export function getOptions(): Promise<Options | undefined> {
  return new Promise(resolve =>
    chrome.storage.sync.get("options", (v: StorageShape) => resolve(v.options))
  );
}

export function setOptions(newValue: Options): Promise<Options> {
  return new Promise(resolve =>
    chrome.storage.sync.set({ options: newValue }, () => resolve(newValue))
  );
}

export function initStorage() {
  return getOptions().then(value =>
    value ? Promise.resolve(value) : setOptions(initOptions)
  );
}
