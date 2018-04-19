/**
 * rpc
 * rpc 调试
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import { observable } from 'mobx'
import Program from 'components/Code/Program'
import H2 from 'components/H2'
import DemoSection from 'components/DemoSection'
import Platforms from 'components/Platforms'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { RPC } from '@gdjiami/gzb-jssdk'

interface Props {
  className?: string
}

@observer
export default class OpenFile extends React.Component<Props> {
  @observable
  private value: string = `
  {
    "jsonrpc": "2.0",
    "id": "xxx",
    "method": "ping",
    "params": {
      "foo": "bar"
    }
  }
  `
  @observable private err?: Error = undefined
  @observable private res: string = ''
  public render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>RPC</title>
        </Helmet>
        <H2>
          rpc调试(rpc) <Platforms pc android ios />
        </H2>
        <DemoSection>
          <TextField
            hintText="输入JSONRPC 请求参数"
            value={this.value}
            onChange={this.handleChange}
            multiLine
          />
          <br />
          <RaisedButton label="请求" onClick={this.request} />
          <div style={{ color: 'red' }}>{!!this.err && this.err.message}</div>
          <br />
          响应代码
          <Program>{this.res}</Program>
          <br />
        </DemoSection>
      </div>
    )
  }

  private handleChange = (evt: React.ChangeEvent<{ value: string }>) => {
    this.value = evt.target.value
  }

  private request = async () => {
    try {
      this.err = undefined
      const payload = JSON.parse(this.value)
      console.log('RPC 调用', payload)
      const res = await RPC.getInstance().raw(payload)
      this.res = JSON.stringify(res, null, '  ')
      console.log('RPC 响应', res)
    } catch (err) {
      this.err = err
    }
  }
}
