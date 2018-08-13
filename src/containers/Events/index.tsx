/**
 * Events
 * 事件
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import styled from 'utils/styled-components'
import Code from 'components/Code'
import H2 from 'components/H2'
import Platforms from 'components/Platforms'
import DemoSection from 'components/DemoSection'
// import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import api from '@gdjiami/gzb-jssdk'

const Button = styled(RaisedButton)`
  margin-bottom: 1em;
  margin-right: 1em;
`

interface Props {
  className?: string
}

@observer
export default class SetTitle extends React.Component<Props> {
  private beforeunloadDisposer: null | (() => void)
  private beforegobackDisposer: null | (() => void)
  public componentWillUnmount() {
    this.teardownBeforegoback()
    this.teardownBeforeunload()
  }
  public render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>events</title>
        </Helmet>
        <H2>
          关闭按钮事件<Platforms pc ios android />
        </H2>
        <DemoSection>
          <Button label="订阅关闭按钮事件" onClick={this.setupBeforeunload} />
          <Button label="取消订阅关闭按钮事件" onClick={this.teardownBeforeunload} />
          <br />
          <a href="https://baidu.com">测试跳转清理</a>
        </DemoSection>
        <DemoSection>
          <H2>示例代码</H2>
          <Code>
            {`
\`\`\`typescript
import Api from '@gdjiami/gzb-jssdk'
const api = Api()

// 可以返回一个字符串，在点击关闭按钮时就会弹出一个confirm 对话框， 打印返回的字符串
// 用法同浏览器原生的beforeunload事件
api.addListener('beforeunload', (event) => {
  return '确认关闭吗？'
})

// 实现自定义的行为
api.addListener('beforeunload', (event) => {
  // 阻止默认行为， 即关闭应用
  event.preventDefault()
  // 实现自定义行为
  myConfirm({
    title: '确认关闭吗?',
    onConfirm () {
      // 退出程序
      api.exit()
    }
  })
})
\`\`\`
          `}
          </Code>
        </DemoSection>
        <H2>
          返回按钮事件<Platforms ios android />
        </H2>
        <DemoSection>
          <Button label="订阅订阅返回按钮事件" onClick={this.setupBeforegoback} />
          <Button label="取消订阅返回按钮事件" onClick={this.teardownBeforegoback} />
        </DemoSection>
        <DemoSection>
          <H2>示例代码</H2>
          <Code>
            {`
\`\`\`typescript
import Api from '@gdjiami/gzb-jssdk'
const api = Api()
// 订阅返回按钮点击事件，我们一般不推荐去捕获返回按钮点击事件。
api.addListener('beforegoback', (event) => {
  event.preventDefault()
  if (window.confirm('确认离开页面吗?')) {
    api.goback()
  }
})
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

  private setupBeforeunload = () => {
    if (!this.beforeunloadDisposer) {
      this.beforeunloadDisposer = api().addListener('beforeunload', () => {
        return '确认关闭吗?'
      })
    }
  }
  private teardownBeforeunload = () => {
    if (this.beforeunloadDisposer) {
      this.beforeunloadDisposer()
      this.beforeunloadDisposer = null
    }
  }

  private setupBeforegoback = () => {
    if (!this.beforegobackDisposer) {
      this.beforegobackDisposer = api().addListener('beforegoback', event => {
        event.preventDefault()
        if (window.confirm('确认离开页面吗?')) {
          // api.goback()
          history.go(-1)
        }
      })
    }
  }
  private teardownBeforegoback = () => {
    if (this.beforegobackDisposer) {
      this.beforegobackDisposer()
      this.beforegobackDisposer = null
    }
  }
}
