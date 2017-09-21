/**
 * openFile
 * 打开文件
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import { observable } from 'mobx'
import Code from 'components/Code'
import H2 from 'components/H2'
import DemoSection from 'components/DemoSection'
import Platforms from 'components/Platforms'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import api from '@gdjiami/gzb-jssdk'

interface Props {
  className?: string
}

@observer
export default class OpenFile extends React.Component<Props> {
  @observable private value: string = ''
  @observable private res: string = ''
  public render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>setTitle</title>
        </Helmet>
        <H2>
          打开文件 <Platforms pc />
        </H2>
        <DemoSection>
          <TextField
            hintText="输入文件url"
            value={this.value}
            onChange={this.handleChange}
          />
          <br />
          请求参数
          <Code>
            {`
\`\`\`json
{
  "url": ${this.value}
}
\`\`\` `}
          </Code>
          <br />
          <RaisedButton label="打开" onClick={this.open} />
          <br />
          {!!this.res && (
            <div>
              返回参数
              <Code>
                {`
\`\`\`json
${this.res}
\`\`\`
            `}
              </Code>
            </div>
          )}
        </DemoSection>
        {/* <DemoSection>
          <H2>示例代码</H2>
          <Code>
            {`
\`\`\`typescript
import Api from '@gdjiami/gzb-jssdk'
const api = Api()
api.setTitle('value')
\`\`\`
          `}
          </Code>
        </DemoSection> */}
        <DemoSection>
          <H2>文档</H2>
        </DemoSection>
      </div>
    )
  }

  private handleChange = (evt: React.ChangeEvent<{ value: string }>) => {
    this.value = evt.target.value
  }

  private open = () => {
    api().setUpBridge(bridge => {
      bridge.callHandler('openFile', { url: this.value }, res => {
        this.res = res
      })
    })
  }
}
