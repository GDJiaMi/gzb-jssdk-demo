/**
 * Test Store
 */
import Store from 'utils/Store'
import { observable, action } from 'mobx'

interface State {
  count: number
}

export default class TestStore extends Store {
  @observable public count: number = 1

  @action.bound
  public increment() {
    this.count++
  }

  @action.bound
  public decrement() {
    this.count--
  }

  public constructor() {
    super('TestStore')
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
