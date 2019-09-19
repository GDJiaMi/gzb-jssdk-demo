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

interface Listener {
  id: string
  name: string
  callback: Function
}

const HISTORY_KEY = '__rh__'
let uid = 0

@observer
export default class OpenFile extends React.Component<Props> {
  @observable private history: Array<[string, any]> = []
  @observable private method: string = `chooseImg`
  @observable private value: string = `{maxSizeKb: 2000}`
  @observable private eventName: string = 'Test'
  @observable private events: Array<Listener> = []
  @observable private err?: Error = undefined
  @observable private res: string = ''

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search)
    this.method = params.get('method') || this.method
    this.value = params.get('value') || this.value
    this.eventName = params.get('event') || this.eventName
    const h = localStorage.getItem(HISTORY_KEY)
    if (h) {
      this.history = JSON.parse(h)
    }
    api().setTitle('test')
  }

  public render() {
    return (
      <div className={this.props.className}>
        <QRCode value={location.href} />
        <br />
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
          <br />
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
          <div>调用记录:</div>
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
        </DemoSection>

        <H2>
          Bridge 事件调试 <Platforms android ios />
        </H2>
        <DemoSection>
          <TextField
            floatingLabelText="事件名"
            value={this.eventName}
            onChange={e => (this.eventName = (e.target as any).value)}
          />
          <RaisedButton label="添加订阅" onClick={this.addListener} />
          <br />
          <br />
          <div>队列:</div>
          <ul>
            {this.events.map(i => (
              <li>
                {i.id}: {i.name}
                <RaisedButton
                  label="取消订阅"
                  onClick={() => this.removeListener(i)}
                />
              </li>
            ))}
          </ul>
        </DemoSection>
      </div>
    )
  }

  private store = () => {
    const params = new URLSearchParams()
    params.set('method', this.method)
    params.set('value', this.value)
    params.set('event', this.eventName)
    history.replace(`/debug?${params}`)
  }

  private addListener = () => {
    try {
      let id = (uid++).toString()
      const name = this.eventName
      const listener = (data: any) => {
        console.log(`${id} - ${name}: 事件响应`, data)
      }
      // @ts-ignore
      window.WebViewJavascriptBridge.addListener &&
        // @ts-ignore
        window.WebViewJavascriptBridge.addListener(name, listener)
      this.events.push({ name, callback: listener, id })
    } catch (err) {
      console.error(err)
    }
  }

  private removeListener = (i: Listener) => {
    const idx = this.events.indexOf(i)
    if (idx !== -1) {
      // @ts-ignore
      window.WebViewJavascriptBridge.removeListener &&
        // @ts-ignore
        window.WebViewJavascriptBridge.removeListener(i.name, i.callback)
      this.events.splice(idx, 1)
    }
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
