/**
 * Status Bar
 * 状态栏
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import styled from 'utils/styled-components'
import { observable } from 'mobx'
import Doc from 'components/Code/Doc'
import Program from 'components/Code/Program'
import H2 from 'components/H2'
import Platforms from 'components/Platforms'
import DemoSection from 'components/DemoSection'
import TextField from 'material-ui/TextField'
import _Button from 'material-ui/RaisedButton'
import Api, { MobileApi, Device } from '@gdjiami/gzb-jssdk'

const Button = styled(_Button)`margin-bottom: 0.4em;`

const api = Api() as MobileApi

interface Props {
  className?: string
}

@observer
export default class StatusBar extends React.Component<Props> {
  @observable private backButton: boolean
  @observable private closeButton: boolean
  @observable private moreButton: boolean
  @observable private color: string = '#000'
  public constructor(props: object) {
    super(props)
    this.initialState()
  }
  public render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>状态栏</title>
        </Helmet>
        <H2>
          隐藏和显示状态栏<Platforms ios android />
        </H2>
        <DemoSection>
          <Button label="显示" onClick={this.show} />
          <br />
          <Button label="隐藏" onClick={this.hide} />
        </DemoSection>
        <DemoSection>
          <H2>示例代码</H2>
          <Program>
            {`
import Api from '@gdjiami/gzb-jssdk'
const api = Api()
// 显示状态栏
api.showBar()
// 隐藏状态栏
api.hideBar()
          `}
          </Program>
        </DemoSection>

        <H2>
          隐藏和显示状态栏按钮<Platforms ios android />
        </H2>
        <DemoSection>
          <Button
            label={`显示/隐藏返回按钮${this.backButton}`}
            onClick={this.toggleBackButton}
          />
          <br />
          <Button
            label={`显示/隐藏关闭按钮${this.closeButton}`}
            onClick={this.toggleCloseButton}
          />
          <br />
          <Button
            label={`显示/隐藏更多按钮${this.moreButton}`}
            onClick={this.toggleMoreButton}
          />
        </DemoSection>
        <DemoSection>
          <H2>示例代码</H2>
          <Program>
            {`
import Api, { MobileApi } from '@gdjiami/gzb-jssdk'
// 这些接口只在移动端有效
const api = Api() as MobileApi

// 显示返回按钮
api.setBackButtonVisible(true)
api.getBackButtonVisible()

// 显示关闭按钮
api.setCloseButtonVisible(true)
api.getCloseButtonVisible()

// 显示更多按钮
api.setMoreButtonVisible(true)
api.getMoreButtonVisible()
          `}
          </Program>
        </DemoSection>
        <DemoSection>
          <H2>
            设置状态栏颜色<Platforms ios android />
          </H2>
          <TextField
            hintText="输入颜色值(#hex格式)"
            value={this.color}
            onChange={this.handleColorChange}
          />
          <Button
            label="设置颜色"
            onClick={this.setColor}
            labelColor={this.color}
          />
          <br />
        </DemoSection>
        <DemoSection>
          <H2>示例代码</H2>
          <Program>
            {`
import Api from '@gdjiami/gzb-jssdk'
// 这些接口只在移动端有效
const api = Api() as MobileApi
api.setBarColor('#FFF')
          `}
          </Program>
        </DemoSection>
        <DemoSection>
          <H2>文档</H2>
          <Doc>
            {`
###  setBarVisible
设置状态栏的可见性， 也可以使用showBar， hideBar代替
► **setBarVisible**(visible: *\`boolean\`*): \`void\`

---

###  showBar
显示状态栏
► **showBar**(): \`void\`


---

###  hideBar
隐藏状态栏
► **hideBar**(): \`void\`


---

###  setBackButtonVisible
设置返回按钮的可见性

> 关闭按钮和返回按钮只能隐藏一个

► **setBackButtonVisible**(visible?: *\`boolean\`*): \`void\`


---


###  getBackButtonVisible
获取返回按钮的可见性

► **getBackButtonVisible**(): \`boolean\`


---


###  setCloseButtonVisible
设置关闭按钮的可见性
> 关闭按钮和返回按钮只能隐藏一个

► **setCloseButtonVisible**(visible?: *\`boolean\`*): \`void\`


---

###  getCloseButtonVisible
获取关闭按钮的可见性

► **getCloseButtonVisible**(): \`boolean\`


---

###  setMoreButtonVisible
设置更多按钮的可见性

► **setMoreButtonVisible**(visible?: *\`boolean\`*): \`void\`


---

###  getMoreButtonVisible
获取更多按钮的可见性

► **getMoreButtonVisible**(): \`boolean\`


---

###  setBarColor
设置菜单栏颜色
> 注意：目前只支持\`RGB hex\`格式的颜色值， 如\`#FFFFFF\`

► **setBarColor**(color: *\`string\`*): \`void\`
`}
          </Doc>
        </DemoSection>
      </div>
    )
  }

  private initialState() {
    if (Device.mobile()) {
      this.backButton = api.getBackButtonVisible()
      this.closeButton = api.getCloseButtonVisible()
      this.moreButton = api.getMoreButtonVisible()
    }
  }

  private handleColorChange = (evt: React.ChangeEvent<{ value: string }>) => {
    this.color = evt.target.value
  }

  private setColor = () => {
    api.setBarColor(this.color)
  }

  private show = () => {
    api.showBar()
  }

  private hide = () => {
    api.hideBar()
  }

  private toggleBackButton = () => {
    this.backButton = !this.backButton
    api.setBackButtonVisible(this.backButton)
  }

  private toggleCloseButton = () => {
    this.closeButton = !this.closeButton
    api.setCloseButtonVisible(this.closeButton)
  }

  private toggleMoreButton = () => {
    this.moreButton = !this.moreButton
    api.setMoreButtonVisible(this.moreButton)
  }
}
