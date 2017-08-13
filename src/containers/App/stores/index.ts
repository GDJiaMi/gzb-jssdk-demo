/**
 * 注入到全局store容器中
 */
import AppStore from './AppStore'

let instance = new AppStore()
instance.injectStore()

export default instance

/**
 * 热更新示例
 */
if (module.hot) {
  module.hot.accept('./AppStore', () => {
    const state = instance.serialize()
    instance.destory()
    const newInstance = new AppStore()
    newInstance.deserialize(state)
    newInstance.injectStore()
    instance = newInstance
  })
}
