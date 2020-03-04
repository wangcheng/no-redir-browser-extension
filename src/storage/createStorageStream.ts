import xs, { Listener } from "xstream";
import { Options } from "../types";
import { initStorage, subscribeOptionsChange } from "./helpers";

const noop = () => {};

export default function createStorageStream() {
  let stop = noop;

  const start = (listener: Listener<Options>) => {
    const handleOptionsChange = (value: Options) => listener.next(value);
    initStorage().then(handleOptionsChange);
    const subscription = subscribeOptionsChange(handleOptionsChange);
    stop = subscription.unsubscribe;
  };

  return xs.create({ start, stop });
}
