/**
 * rpc
 * rpc 调试
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router'
import QRCode from 'qrcode.react'
import { observable } from 'mobx'
import Program from 'components/Code/Program'
import H2 from 'components/H2'
import DemoSection from 'components/DemoSection'
import Platforms from 'components/Platforms'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { api } from '@gdjiami/gzb-jssdk'
import history from '../../browserHistory'

interface Props extends RouteComponentProps<any> {
  className?: string
}

const HISTORY_KEY = '__rh__'

@observer
export default class OpenFile extends React.Component<Props> {
  @observable private history: Array<[string, any]> = []
  @observable private method: string = `chooseImg`
  @observable private value: string = `{maxSizeKb: 2000}`
  @observable private err?: Error = undefined
  @observable private res: string = ''

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search)
    this.method = params.get('method') || this.method
    this.value = params.get('value') || this.value
    const h = localStorage.getItem(HISTORY_KEY)
    if (h) {
      this.history = JSON.parse(h)
    }
    api().setTitle('test')
  }

  public render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>Bridge 调试</title>
        </Helmet>
        <H2>
          Bridge调试 <Platforms android ios />
        </H2>
        <DemoSection>
          <TextField
            floatingLabelText="方法名"
            hintText="方法名"
            value={this.method}
            onBlur={this.store}
            onChange={e => (this.method = (e.target as any).value)}
          />
          <TextField
            floatingLabelText="输入请求参数(JSON)"
            hintText="输入请求参数(必须是合法的JSON类型或表达式)"
            value={this.value}
            onChange={e => (this.value = (e.target as any).value)}
            rows={3}
            onBlur={this.store}
            multiLine
          />
          <br />
          <RaisedButton label="请求" onClick={this.request} />
          <div style={{ color: 'red' }}>{!!this.err && this.err.message}</div>
          <br />
          响应代码
          <Program type="json">{this.res}</Program>
          <br />
          <QRCode value={location.href} />
          <br />
          <H2>
            调用记录:
            <ul>
              {this.history.map((i, idx) => {
                const [method, payload] = i
                const strPayload = JSON.stringify(payload, undefined, 2)
                return (
                  <li
                    key={idx}
                    onClick={() => {
                      this.method = method
                      this.value = strPayload
                    }}
                  >
                    {method}: {strPayload}
                  </li>
                )
              })}
            </ul>
          </H2>
        </DemoSection>
      </div>
    )
  }

  private store = () => {
    const params = new URLSearchParams()
    params.set('method', this.method)
    params.set('value', this.value)
    history.replace(`/debug?${params}`)
  }

  private request = async () => {
    try {
      let payload: any
      eval(`payload = ${this.value}`)
      console.log('请求', this.method, payload)
      window.WebViewJavascriptBridge.callHandler(this.method, payload, res => {
        // 原始返回字符串
        console.log('返回值', typeof res, res)
        if (res) {
          this.res = JSON.stringify(JSON.parse(res), undefined, 2)
        } else {
          this.res = '返回值为空'
        }
      })
      this.history.unshift([this.method, payload])
      this.history.slice(0, 20)
      localStorage.setItem(HISTORY_KEY, JSON.stringify(this.history))
    } catch (err) {
      this.err = err
    }
  }
}
