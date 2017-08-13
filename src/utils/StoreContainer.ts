/**
 * Mobx Store Container
 */
import { observable, action, computed } from 'mobx'
import { EventEmitter } from 'fbemitter'
interface Store {
  namespace: string
}

export default class StoreContainer extends EventEmitter {
  private static instance: StoreContainer
  @observable public stores: Map<string, Store> = new Map()

  public static getInstance(): StoreContainer {
    if (this.instance == null) {
      this.instance = new StoreContainer()
    }
    return this.instance
  }

  @computed
  get storeMap(): { [namespace: string]: Store } {
    if (this.stores) {
      const result = {}
      const entries = this.stores.entries()
      for (const [key, value] of entries) {
        result[key] = value
      }
      return result
    }
    return {}
  }

  /**
   * 很遗憾的是@action竟然不能和箭头函数一起用？
   */
  @action.bound
  public injectStore(store: Store) {
    this.stores.set(store.namespace, store)
  }

  private constructor(...stores: Store[]) {
    super()
    if (stores && stores.length) {
      stores.forEach(store => {
        this.injectStore(store)
      })
    }
  }
}
