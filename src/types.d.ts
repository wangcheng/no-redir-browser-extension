import { Stream } from "xstream";
import { Driver } from "@cycle/run";
import { Events } from "webextension-polyfill-ts";

export interface Subscription {
  unsubscribe: () => void;
}

export interface Rule {
  id: string;
  filter: Events.UrlFilter;
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
  (currentValue: Options): Options;
}

export type OptionsStream = Stream<Options>;
export type OptionsReducerStream = Stream<OptionsReducer | null>;
export type StorageDriver = Driver<OptionsReducerStream, OptionsStream>;
