/**
 * 状态栏
 */
import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Drawer from 'material-ui/Drawer'
import OAppBar from 'material-ui/AppBar'
import MenuItem from 'material-ui/MenuItem'
import styled from 'utils/styled-components'
import { Device } from '@gdjiami/gzb-jssdk'
import { Link as _Link, LinkProps } from 'react-router-dom'

// tslint:disable:jsx-no-lambda
const Container = styled.div`
  width: 100%;
  height: 100%;
`
const AppBar = styled(OAppBar)`background-color: red !important;`

const StyledLink = styled(_Link)`
  text-decoration: none;
  font-weight: bold;
  color: ${props => props.theme.semantic.alert};
`

@observer
export default class StatusBar extends React.Component {
  @observable private showDrawer: boolean = false
  private handleLeftButtonTap = () => {
    this.showDrawer = !this.showDrawer
  }

  private handleLinkClick = () => {
    this.showDrawer = false
  }

  // tslint:disable-next-line
  public render() {
    const Link = (props: LinkProps) => {
      return <StyledLink {...props} onClick={this.handleLinkClick} />
    }

    return (
      <Container>
        <AppBar
          title="GZB-JSSDK DEMO"
          onLeftIconButtonTouchTap={this.handleLeftButtonTap}
        />
        <Drawer
          open={this.showDrawer}
          openSecondary
          width={200}
          docked={false}
          onRequestChange={open => (this.showDrawer = open)}
        >
          <Link to="/">
            <MenuItem>Home</MenuItem>
          </Link>
          <Link to="/set-title">
            <MenuItem>设置标题</MenuItem>
          </Link>
          <Link to="/phone">
            <MenuItem>拨打手机/发送信息/邮件</MenuItem>
          </Link>
          <Link to="/location-to">
            <MenuItem>导航</MenuItem>
          </Link>
          <Link to="/contact">
            <MenuItem>联系人</MenuItem>
          </Link>
          <Link to="/session">
            <MenuItem>会话</MenuItem>
          </Link>
          <Link to="/qrcode">
            <MenuItem>扫码</MenuItem>
          </Link>
          <Link to="/choose-image">
            <MenuItem>选择图片</MenuItem>
          </Link>
          <Link to="/get-location">
            <MenuItem>获取当前位置</MenuItem>
          </Link>
          {!Device.desktop() && (
            <Link to="/status-bar">
              <MenuItem>状态栏</MenuItem>
            </Link>
          )}
          <Link to="/events">
            <MenuItem>事件</MenuItem>
          </Link>
          <Link to="/misc">
            <MenuItem>杂项</MenuItem>
          </Link>
        </Drawer>
      </Container>
    )
  }
}
