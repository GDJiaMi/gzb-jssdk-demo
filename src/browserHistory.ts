/**
 * router history
 */
import createHashHistory from 'history/createHashHistory'
import {
  syncHistoryWithStore,
  RouterStore as IRouterStore,
} from 'mobx-react-router'
import StoreContainer from 'utils/StoreContainer'

class RouterStore extends IRouterStore {
  public namespace: string = 'RouterStore'
  public constructor() {
    super()
  }
}

const hashHistory = createHashHistory()
const routerStore = new RouterStore()
const history = syncHistoryWithStore(hashHistory, routerStore)

StoreContainer.getInstance().injectStore(routerStore)

export default history
