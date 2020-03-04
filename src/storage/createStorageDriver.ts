import createStorageStream from "./createStorageStream";
import { setOptions, getOptions } from "./helpers";
import { OptionsReducerStream } from "../types";

export default function createStorageDriver() {
  const storage$ = createStorageStream();
  return (reducer$: OptionsReducerStream) => {
    reducer$.subscribe({
      next: reducer => {
        if (reducer) {
          getOptions().then(currentValue => {
            if (currentValue) {
              setOptions(reducer(currentValue));
            }
          });
        }
      }
    });
    return storage$;
  };
}
