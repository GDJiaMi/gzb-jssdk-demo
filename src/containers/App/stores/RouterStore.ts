/**
 * Router Store
 */
import { RouterStore as IRouterStore } from 'mobx-react-router'
export default class RouterStore extends IRouterStore {
  public namespace: string = 'RouterStore'
  public constructor() {
    super()
  }
}
