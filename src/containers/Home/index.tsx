/**
 * 首页
 */
import * as React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'utils/styled-components'

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 10em;
`

const QRcode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > img {
    width: 200px;
    height: 200px;
  }

  & > span {
    color: ${props => props.theme.semantic.alert};
  }
`

const Title = styled.h1`
  color: ${props => props.theme.semantic.alert};
  font-size: 1.3em;
`

export default class Home extends React.Component {
  public render() {
    return (
      <div>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <Header>
          <img src={require('assets/images/logo.jpg')} />
          <Title>GZB JSSDK DEMO</Title>
        </Header>
        <QRcode>
          <img src={require('assets/images/qrcode.png')} />
          <span>(在工作宝上扫描二维码)</span>
        </QRcode>
      </div>
    )
  }
}
