/**
 * inject store
 */
import * as React from 'react'
import { observer } from 'mobx-react'
import StoreContainer from './StoreContainer'

export default function inject<InjectorProps, Props extends InjectorProps>(
  ...stores: string[]
) {
  return (Component: React.ComponentType<Props>) => {
    const componentName: string =
      Component.displayName || Component.name || 'Unkown'

    @observer
    class Injector extends React.Component<InjectorProps> {
      public static displayName = `Inject-${componentName}-with-${stores.join(
        '-',
      )}`
      public componentWillMount(): void {
        stores.forEach(name => {
          if (!StoreContainer.getInstance().stores.has(name)) {
            throw new Error(`[inject]: Unknow Store name '${name}'`)
          }
        })
      }
      public render() {
        const storesProps = stores.reduce((acc, curr) => {
          acc[curr] = StoreContainer.getInstance().stores.get(curr)
          return acc
        }, {})
        return <Component {...storesProps} {...this.props} />
      }
    }

    return Injector
  }
}
