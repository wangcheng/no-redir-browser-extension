import {Stream} from 'xstream'
import {Driver} from '@cycle/run'

export interface Options {
  showNotification: boolean
}

export interface StorageShape {
  options?: Options
}

export type StorageSource = Stream<Options>
export type StorageDriver = Driver<StorageSource, StorageSource>
