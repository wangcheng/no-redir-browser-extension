import {Stream} from 'xstream'
import {Driver} from '@cycle/run'

export interface Rule {
  id: string
  pattern: string
  key: string
  template: string | null
}

export interface Options {
  showNotification: boolean
  rules: Rule[]
}

export interface StorageShape {
  options?: Options
}

export interface OptionsReducer {
  (currentValue?: Options): Options
}

export type OptionsStream = Stream<Options>
export type OptionsReducerStream = Stream<OptionsReducer | null>
export type StorageDriver = Driver<OptionsReducerStream, OptionsStream>
