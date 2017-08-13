/**
 * App Store
 */
import Store from 'utils/Store'
import { observable, action } from 'mobx'

interface State {
  count: number
}

export default class AppStore extends Store {
  @observable public count: number = 2

  @action.bound
  public increment() {
    this.count++
  }

  @action.bound
  public decrement() {
    this.count--
  }

  public constructor() {
    super('AppStore')
  }

  public destory() {}

  public serialize(): State {
    return {
      count: this.count,
    }
  }

  public deserialize(state: State) {
    this.count = state.count
  }
}
