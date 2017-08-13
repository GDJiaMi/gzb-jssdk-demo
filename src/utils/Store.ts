/**
 * Mobx Store
 */
import StoreContainer from './StoreContainer'

export default abstract class Store {
  public namespace: string
  /**
   * 序列化
   */
  public abstract serialize(): object
  public abstract deserialize(state: object): void

  /**
   * 注入到StoreContainer中
   */
  public injectStore() {
    StoreContainer.getInstance().injectStore(this)
  }

  public constructor(namespace: string) {
    this.namespace = namespace
  }

  /**
   * 销毁，主要用于热更新
   */
  public abstract destory(): void

  /**
   * 事件订阅，用于Store之间通信
   */
  protected addListener<T>(
    event: string,
    callback: (arg: T) => void,
    context?: any, // tslint:disable-line:no-any
  ) {
    return StoreContainer.getInstance().addListener(event, callback, context)
  }

  protected once<T>(
    event: string,
    callback: (arg: T) => void,
    context?: any, // tslint:disable-line:no-any
  ) {
    return StoreContainer.getInstance().once(event, callback, context)
  }

  protected emit(event: string, ...data: any[]) {
    // tslint:disable-line:no-any
    // tslint:disable-line:no-any
    return StoreContainer.getInstance().emit(event, ...data)
  }
}
