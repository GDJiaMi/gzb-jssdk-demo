/**
 * openFile
 * 打开文件
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import { observable } from 'mobx'
import Program from 'components/Code/Program'
import Doc from 'components/Code/Doc'
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
          打开文件(openFile) <Platforms pc />
        </H2>
        <DemoSection>
          <TextField
            hintText="输入文件url"
            value={this.value}
            onChange={this.handleChange}
          />
          <br />
          示例代码
          <Program>
            {`
import Api from '@gdjiami/gzb-jssdk'
const api = Api()
api.openFile('${this.value}')
`}
          </Program>
          <br />
          <RaisedButton label="打开" onClick={this.open} />
          <br />
        </DemoSection>
        <DemoSection>
          <H2>文档</H2>
          <Doc>
            {`
###  openFile

► **openFile**(url: *\`string\`*): \`Promise\`<\`void\`>
打开指定文件

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| url | \`string\`   |  文件url |

**Returns:** \`Promise\`<\`void\`>
            `}
          </Doc>
        </DemoSection>
      </div>
    )
  }

  private handleChange = (evt: React.ChangeEvent<{ value: string }>) => {
    this.value = evt.target.value
  }

  private open = () => {
    const params = { url: this.value }
    console.log('openFile 请求参数', params)
    api().setUpBridge(bridge => {
      bridge.callHandler('openFile', params, res => {
        this.res = res
        console.log('openFile 响应参数', res)
      })
    })
  }
}
