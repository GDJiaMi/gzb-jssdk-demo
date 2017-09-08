/**
 * 根组件
 */
import React from 'react'
import {
  Route,
  Link as OLink,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import inject from 'utils/inject'
import { asyncLoadComponent, asyncLoadStoreAndComponent } from 'utils/asyncLoad'
import styled from 'utils/styled-components'
import Drawer from 'material-ui/Drawer'
import OAppBar from 'material-ui/AppBar'
import MenuItem from 'material-ui/MenuItem'
import Icon from 'components/Icon'
import AppStore from './stores/AppStore'

const Link = styled(OLink)`
  text-decoration: none;
  font-weight: bold;
  color: ${props => props.theme.semantic.alert};
`

const Container = styled.div`
  max-width: 768px;
  min-height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const AppBar = styled(OAppBar)`background-color: red !important;`

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
// 惰性载入store和组件
const Doc = asyncLoadStoreAndComponent(() =>
  Promise.all([import('containers/Doc/stores'), import('containers/Doc')]),
)

interface AppProps<T = {}> extends RouteComponentProps<T> {
  AppStore: AppStore
}

@observer
export class App extends React.Component<AppProps> {
  @observable private showDrawer: boolean = false
  private handleLeftButtonTap = () => {
    this.showDrawer = !this.showDrawer
  }

  // tslint:disable-next-line
  public render() {
    return (
      <Container>
        <AppBar
          title="DEMO"
          onLeftIconButtonTouchTap={this.handleLeftButtonTap}
        />
        <Drawer open={this.showDrawer} openSecondary width={200}>
          <Link to="/">
            <MenuItem>Home</MenuItem>
          </Link>
          <Link to="/set-button">
            <MenuItem>设置标题</MenuItem>
          </Link>
        </Drawer>

        <Main>
          <Route exact path="/" component={Home} />
          <Route path="/doc" component={Doc} />
          <Route
            path="/set-button"
            component={asyncLoadComponent(() => import('containers/SetTitle'))}
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
