/**
 * geoNavigate
 * 打开导航
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
export default class GeoNavigate extends React.Component<Props> {
  @observable private latValue: number = 22.37601624256679
  @observable private longValue: number = 113.57032199649188
  @observable private toAddress: string = '广东佳米科技有限公司'
  @observable private coordType: string = 'WGS84'
  @observable private res: string = ''
  public render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>setTitle</title>
        </Helmet>
        <H2>
          打开导航(geoNavigate)<Platforms android ios />
        </H2>
        <DemoSection>
          <TextField
            hintText="latitude"
            value={this.latValue}
            onChange={this.handleLatChange}
          />
          <br />
          <TextField
            hintText="longitude"
            value={this.longValue}
            onChange={this.handleLongChange}
          />
          <br />
          <TextField
            hintText="address"
            value={this.toAddress}
            onChange={this.handleAddressChange}
          />
          请求参数
          <Code>
            {`
\`\`\`json
{
  to:{
    "latitude": "${this.latValue}",
    "longitude": "${this.longValue}",
    "address": "${this.toAddress}",
  },
  coordType: "${this.coordType}",
}
\`\`\` 
`}
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

  private handleLatChange = (evt: React.ChangeEvent<{ value: string }>) => {
    this.latValue = parseFloat(evt.target.value)
  }

  private handleLongChange = (evt: React.ChangeEvent<{ value: string }>) => {
    this.longValue = parseFloat(evt.target.value)
  }

  private handleAddressChange = (evt: React.ChangeEvent<{ value: string }>) => {
    this.toAddress = evt.target.value
  }

  private open = () => {
    const params = {
      to: {
        latitude: this.latValue,
        longitude: this.longValue,
        address: this.toAddress,
      },
      coordType: this.coordType,
    }
    console.log('geoNavigate 请求参数', params)
    api().setUpBridge(bridge => {
      bridge.callHandler('geoNavigate', params, res => {
        this.res = res
        console.log('geoNavigate 响应参数', res)
      })
    })
  }
}
