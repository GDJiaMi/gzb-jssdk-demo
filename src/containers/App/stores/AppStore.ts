/**
 * App Store
 */
import Store from 'utils/Store'
import { observable, action } from 'mobx'
import { DEFAULT_LOCALE } from '../constants'

interface State {
  count: number
}

export default class AppStore extends Store {
  @observable public count: number = 2
  @observable public locale: string = DEFAULT_LOCALE

  @action.bound
  public increment() {
    this.count++
  }

  @action.bound
  public decrement() {
    this.count--
  }

  @action.bound
  public setLocale(locale: string) {
    this.locale = locale
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
