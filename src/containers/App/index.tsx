/**
 * 根组件
 */
import React from 'react'
import { Route, RouteComponentProps, withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import inject from 'utils/inject'
import { asyncLoadComponent } from 'utils/asyncLoad'
import styled from 'utils/styled-components'
import Icon from 'components/Icon'
import StatusBar from './StatusBar'
import AppStore from './stores/AppStore'

const Container = styled.div`
  max-width: 768px;
  min-height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Main = styled.div`
  flex: 1;
  width: 100%;
  padding: 2em;
`

const Footer = styled.div`width: 100%;`

const Infos = styled.div`
  font-size: 0.8em;
  display: flex;
  justify-content: space-around;
  padding: 1em;
  flex-wrap: wrap;
`

const Socials = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const SocialsIcon = styled(Icon)`
  font-size: 1.5em;
  margin: 0.5em;
`

const Twitter = styled(SocialsIcon)`color: #1da1f2;`

const Github = styled(SocialsIcon)`color: black;`

// 惰性载入组件
const Home = asyncLoadComponent(() => import('containers/Home'))
interface AppProps<T = {}> extends RouteComponentProps<T> {
  AppStore: AppStore
}

@observer
export class App extends React.Component<AppProps> {
  public render() {
    return (
      <Container>
        <StatusBar />
        <Main>
          <Route exact path="/" component={Home} />
          <Route
            path="/set-title"
            component={asyncLoadComponent(() => import('containers/SetTitle'))}
          />
          <Route
            path="/phone"
            component={asyncLoadComponent(() => import('containers/Phone'))}
          />
          <Route
            path="/location-to"
            component={asyncLoadComponent(() =>
              import('containers/LocationTo'),
            )}
          />
          <Route
            path="/contact"
            component={asyncLoadComponent(() =>
              import('containers/ShowContact'),
            )}
          />
          <Route
            path="/session"
            component={asyncLoadComponent(() => import('containers/Session'))}
          />
          <Route
            path="/qrcode"
            component={asyncLoadComponent(() => import('containers/QRCode'))}
          />
          <Route
            path="/choose-image"
            component={asyncLoadComponent(() =>
              import('containers/ChooseImage'),
            )}
          />
          <Route
            path="/get-location"
            component={asyncLoadComponent(() =>
              import('containers/GetLocation'),
            )}
          />
          <Route
            path="/status-bar"
            component={asyncLoadComponent(() => import('containers/StatusBar'))}
          />
          <Route
            path="/misc"
            component={asyncLoadComponent(() => import('containers/Misc'))}
          />
          <Route
            path="/events"
            component={asyncLoadComponent(() => import('containers/Events'))}
          />
          <Route
            path="/preview-img"
            component={asyncLoadComponent(() =>
              import('containers/PreviewImg'),
            )}
          />
          <Route
            path="/open-file"
            component={asyncLoadComponent(() => import('containers/OpenFile'))}
          />
          <Route
            path="/request-permission"
            component={asyncLoadComponent(() =>
              import('containers/RequestPermission'),
            )}
          />
          <Route
            path="/menu-item"
            component={asyncLoadComponent(() => import('containers/MoreMenu'))}
          />
        </Main>
        <Footer>
          <Infos>
            <span>This project is licensed under the MIT license</span>
            <select
              onChange={this.handleLocaleChange}
              value={this.props.AppStore.locale}
            >
              <option>en</option>
              <option>zh</option>
            </select>
            <span>made with love by Mygzb Web Group</span>
          </Infos>
          <Socials>
            <a href="https://github.com/carney520" target="_blank">
              <Github src={require('assets/icons/github.svg')} />
            </a>
            <a href="https://twitter.com/ivanivanivy" target="_blank">
              <Twitter src={require('assets/icons/twitter.svg')} />
            </a>
          </Socials>
        </Footer>
      </Container>
    )
  }

  private handleLocaleChange = (
    event: React.ChangeEvent<{ value: string }>,
  ) => {
    this.props.AppStore.setLocale(event.target.value)
  }
}

/**
 * 因为App中使用了路由，而且又使用了@observer。 observer会重写shouldComponentUpdate
 * 导致当路由变化时对应的组件没有渲染，所以这个要使用withRouter创建路由的props，从而通过
 * shouldComponentUpdate的检验
 */
export default withRouter(
  inject<RouteComponentProps<{}>, AppProps>('AppStore')(App),
)
