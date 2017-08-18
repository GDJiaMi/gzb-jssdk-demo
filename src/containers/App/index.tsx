/**
 * 根组件
 */
import * as React from 'react'
import { Route, Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { observer } from 'mobx-react'
import inject from 'utils/inject'
import { asyncLoadComponent, asyncLoadStoreAndComponent } from 'utils/asyncLoad'
import styled from 'utils/styled-components'
import Button from 'components/Button'
import Icon from 'components/Icon'
import AppStore from './stores/AppStore'
import messages from './messages'

const Container = styled.div`
  max-width: 768px;
  min-height: 100%;
  margin: 0 auto;
  padding: 0 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 10em;
`

const Title = styled.h1`
  color: ${props => props.theme.semantic.alert};
  font-size: 1.3em;
`

const Nav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > a:not(:first-child) {
    margin-left: 1em;
  }
`
const Main = styled.div`flex: 1;`

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
  margin: .5em;
`

const Twitter = styled(SocialsIcon)`
  color: #1da1f2;
`

const Github = styled(SocialsIcon)`
  color: black;
`

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
  public render() {
    return (
      <Container>
        <Header>
          <img src={require('assets/images/logo.jpg')} />
          <Title>
            <FormattedMessage {...messages.header} />
          </Title>
        </Header>
        <Nav>
          <Link to="/">
            <Button color="alert">Home</Button>
          </Link>
          <Link to="/doc">
            <Button color="alert">Doc</Button>
          </Link>
        </Nav>
        <Main>
          <Route exact path="/" component={Home} />
          <Route path="/doc" component={Doc} />
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
