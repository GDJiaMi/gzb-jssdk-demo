/**
 * 按需载入组件
 */
import * as React from 'react'
import Loadable from 'react-loadable'
import ComponentLoading from 'components/ComponentLoading'

interface ComponentExports<Props> {
  default: React.ComponentType<Props>
}

export function asyncLoadComponent<
  Props,
  Exports extends ComponentExports<Props>
>(loader: () => Promise<Exports>) {
  return Loadable({
    loader,
    loading: ComponentLoading,
    timeout: 15000,
    render(loaded: Exports, props: Props) {
      const Component = loaded.default
      return <Component {...props} />
    },
  })
}

export function asyncLoadStoreAndComponent<
  Props,
  Exports extends ComponentExports<Props>
>(loader: () => Promise<[any, Exports]>) {
  // tslint:disable-line:no-any
  return asyncLoadComponent<Props, Exports>(() => {
    return loader().then(([_, comp]) => comp)
  })
}
