/**
 * 提供语言切换功能
 */
import * as React from 'react'
import { IntlProvider } from 'react-intl'
import { withRouter, RouteComponentProps } from 'react-router'
import { observer } from 'mobx-react'
import AppStore from 'containers/App/stores/AppStore'
import inject from './inject'

interface InjectorProps {
  messages: object
  children?: React.ReactNode
}

interface Props extends InjectorProps, RouteComponentProps<{}> {
  AppStore: AppStore
}

@observer
export class LanguageProvider extends React.Component<Props> {
  public render() {
    const locale = this.props.AppStore.locale
    const messages = this.props.messages[locale]
    const nextProps = {
      location: this.props.location,
    }

    return (
      <IntlProvider locale={locale} messages={messages} key={locale}>
        {React.cloneElement(
          React.Children.only(this.props.children),
          nextProps,
        )}
      </IntlProvider>
    )
  }
}

export default withRouter<InjectorProps>(
  inject<InjectorProps & RouteComponentProps<{}>, Props>('AppStore')(
    LanguageProvider,
  ),
)
