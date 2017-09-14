/**
 * Status Bar
 * 状态栏
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import styled from 'utils/styled-components'
import { observable } from 'mobx'
import Code from 'components/Code'
import H2 from 'components/H2'
import DemoSection from 'components/DemoSection'
import TextField from 'material-ui/TextField'
import _Button from 'material-ui/RaisedButton'
import Api, { MobileApi } from '@gdjiami/gzb-jssdk'

const Button = styled(_Button)`margin-bottom: 0.4em;`

const api = Api() as MobileApi

interface Props {
  className?: string
}

@observer
export default class StatusBar extends React.Component<Props> {
  @observable private backButton: boolean = api.getBackButtonVisible()
  @observable private closeButton: boolean = api.getCloseButtonVisible()
  @observable private moreButton: boolean = api.getMoreButtonVisible()
  @observable private color: string = '#000'
  public render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>状态栏</title>
        </Helmet>
        <H2>隐藏和显示状态栏</H2>
        <DemoSection>
          <Button label="显示" onClick={this.show} />
          <br />
          <Button label="隐藏" onClick={this.hide} />
        </DemoSection>
        <DemoSection>
          <H2>示例代码</H2>
          <Code>
            {`
\`\`\`typescript
import Api from '@gdjiami/gzb-jssdk'
const api = Api()
// 显示状态栏
api.showBar()
// 隐藏状态栏
api.hideBar()
\`\`\`
          `}
          </Code>
        </DemoSection>

        <H2>隐藏和显示状态栏按钮</H2>
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
          <Code>
            {`
\`\`\`typescript
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
\`\`\`
          `}
          </Code>
        </DemoSection>
        <DemoSection>
          <H2>设置状态栏颜色</H2>
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
          <Code>
            {`
\`\`\`typescript
import Api from '@gdjiami/gzb-jssdk'
// 这些接口只在移动端有效
const api = Api() as MobileApi
api.setBarColor('#FFF')
\`\`\`
          `}
          </Code>
        </DemoSection>
        <DemoSection>
          <H2>文档</H2>
        </DemoSection>
      </div>
    )
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
