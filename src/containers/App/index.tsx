/**
 * 根组件
 */
import * as React from 'react'
import { Route, Link } from 'react-router-dom'
import asyncLoad from 'utils/asyncLoad'
import styled from 'utils/styled-components'
import Button from 'components/Button'

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

const Footer = styled.div`
  width: 100%;
  font-size: 0.8em;
  display: flex;
  justify-content: space-around;
  padding: 1em;
  flex-wrap: wrap;
`

export default class App extends React.Component {
  public render() {
    return (
      <Container>
        <Header>
          <img src={require('assets/images/logo.jpg')} />
          <Title>mygzb 应用组前端脚手架(模板)</Title>
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
          <Route
            exact
            path="/"
            component={asyncLoad(() => import('containers/Home'))}
          />
          <Route
            path="/doc"
            component={asyncLoad(() => import('containers/Doc'))}
          />
        </Main>
        <Footer>
          <span>This project is licensed under the MIT license</span>
          <select>
            <option>en</option>
            <option>zh</option>
          </select>
          <span>made with love by Mygzb Web Group</span>
        </Footer>
      </Container>
    )
  }
}
