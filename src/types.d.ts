import { Stream } from "xstream";
import { Driver } from "@cycle/run";

export interface Subscription {
  unsubscribe: () => void;
}

export interface Rule {
  id: string;
  filter: chrome.events.UrlFilter;
  key: string;
}

export interface Options {
  showNotification: boolean;
  rules: Rule[];
}

export interface StorageShape {
  options?: Options;
}

export interface OptionsReducer {
  (currentValue?: Options): Options;
}

export type OptionsStream = Stream<Options>;
export type OptionsReducerStream = Stream<OptionsReducer | null>;
export type StorageDriver = Driver<OptionsReducerStream, OptionsStream>;
