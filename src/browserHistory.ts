/**
 * router history
 */
import createHashHistory from 'history/createHashHistory'
import { syncHistoryWithStore } from 'mobx-react-router'
import RouterStore from 'containers/App/stores/RouterStore'
import StoreContainer from 'utils/StoreContainer'

const hashHistory = createHashHistory()
const routerStore = new RouterStore()
const history = syncHistoryWithStore(hashHistory, routerStore)

StoreContainer.getInstance().injectStore(routerStore)

export default history
