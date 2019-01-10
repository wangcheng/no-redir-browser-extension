import createStorageStream from './createStorageStream'
import {setOptions} from './helpers'
import {StorageSource} from './types'

export default function createStorageDriver() {
  const storage$ = createStorageStream()
  return (newValue$: StorageSource) => {
    newValue$.subscribe({
      next: v => setOptions(v),
    })
    return storage$
  }
}
