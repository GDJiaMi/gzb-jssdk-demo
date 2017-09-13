/**
 * Misc
 * 杂项
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
// import styled from 'utils/styled-components'
import { observable } from 'mobx'
import Code from 'components/Code'
import H2 from 'components/H2'
import DemoSection from 'components/DemoSection'
// import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import api, { BridgeResponseError } from '@gdjiami/gzb-jssdk'

interface Props {
  className?: string
}

@observer
export default class SetTitle extends React.Component<Props> {
  @observable private currentLanguage: string
  public render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>杂项</title>
        </Helmet>
        <H2>退出Web App 应用</H2>
        <DemoSection>
          <RaisedButton label="退出" onClick={this.exit} />
        </DemoSection>
        <DemoSection>
          <H2>示例代码</H2>
          <Code>
            {`
\`\`\`typescript
import Api from '@gdjiami/gzb-jssdk'
const api = Api()
api.exit()
\`\`\`
          `}
          </Code>
        </DemoSection>

        <H2>分享</H2>
        <DemoSection>
          <RaisedButton label="分享" onClick={this.share} />
        </DemoSection>
        <DemoSection>
          <H2>示例代码</H2>
          <Code>
            {`
\`\`\`typescript
import Api from '@gdjiami/gzb-jssdk'
const api = Api()
api.shareTo()
\`\`\`
          `}
          </Code>
        </DemoSection>

        <H2>获取系统语言</H2>
        <DemoSection>
          <RaisedButton label="获取" onClick={this.getLanguage} />
          <p>{this.currentLanguage}</p>
        </DemoSection>
        <DemoSection>
          <H2>示例代码</H2>
          <Code>
            {`
\`\`\`typescript
import Api from '@gdjiami/gzb-jssdk'
const api = Api()
api.shareTo()
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

  private getLanguage = async () => {
    try {
      this.currentLanguage = await api().getLanguage()
    } catch (err) {
      if (err instanceof BridgeResponseError) {
        alert(`调用getLanguage 接受失败: ${err.errCode}: ${err.message}`)
        return
      }
      throw err
    }
  }

  private exit = () => {
    api().exit()
  }

  private share = () => {
    api().shareTo()
  }
}
