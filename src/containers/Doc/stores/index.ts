/**
 * 注入到全局store容器中
 */
import TestStore from './TestStore'

let instance = new TestStore()
instance.injectStore()

export default instance

/**
 * 热更新示例
 */
if (module.hot) {
  module.hot.accept('./TestStore', () => {
    const state = instance.serialize()
    instance.destory()
    const newInstance = new TestStore()
    newInstance.deserialize(state)
    newInstance.injectStore()
    instance = newInstance
  })
}
