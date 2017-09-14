/**
 * getLocation
 * 获取当前位置
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import styled from 'utils/styled-components'
import { observable } from 'mobx'
import Code from 'components/Code'
import H2 from 'components/H2'
import Platforms from 'components/Platforms'
import DemoSection from 'components/DemoSection'
import TextField from 'material-ui/TextField'
import _Toggle from 'material-ui/Toggle'
import RaisedButton from 'material-ui/RaisedButton'
import api, {
  GetLocationOptions,
  GetLocationResponse,
} from '@gdjiami/gzb-jssdk'

const Button = styled(RaisedButton)`margin-left: 1em;`
const Toggle = styled(_Toggle)`max-width: 300px;`

interface Props {
  className?: string
}

@observer
export default class SetTitle extends React.Component<Props> {
  @observable private res: GetLocationResponse
  @observable
  private error: {
    code: string | number
    message: string
  }
  @observable
  private params: GetLocationOptions = {
    preferNative: true,
    maximumAge: 10000,
    timeout: 10000,
    enableHighAccuracy: true,
  }
  public render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>GetLocation</title>
        </Helmet>
        <H2>
          获取当前位置<Platforms android ios pc />
        </H2>
        <DemoSection>
          <Toggle
            label="preferNative(优先调用原生方法)"
            toggled={this.params.preferNative}
            onToggle={this.handleTogglePreferNative}
          />
          <br />
          <TextField
            hintText="maximumAge(当前位置缓存周期事件)"
            value={this.params.maximumAge}
            onChange={this.handleMaximumAgeChange}
          />
          <br />
          <TextField
            hintText="timeout(超时事件)"
            value={this.params.timeout}
            onChange={this.handleTimeoutChange}
          />
          <br />
          <Toggle
            label="enableHighAccuracy(启用高精度)"
            toggled={this.params.enableHighAccuracy}
            onToggle={this.handleToggleHAC}
          />
          <br />
          <Button label="获取" onClick={this.getLocation} />
          <br />
          {!!this.res && (
            <ul>
              <li>latitude: {this.res.latitude}</li>
              <li>longitude: {this.res.longitude}</li>
              <li>coordType(坐标系统编码): {this.res.coordType}</li>
              <li>accuracy: {this.res.accuracy}</li>
              <li>address(反向解析的中文详细地址): {this.res.address}</li>
            </ul>
          )}
          {!!this.error && (
            <ul>
              <li>errCode: {this.error.code}</li>
              <li>message: {this.error.message}</li>
            </ul>
          )}
        </DemoSection>
        <DemoSection>
          <H2>示例代码</H2>
          <Code>
            {`
\`\`\`typescript
import Api, { BridegeResponseError } from '@gdjiami/gzb-jssdk'
const api = Api()
async function getLocation() {
  try {
    const { latitude, longitude, coordType } = api.getLocation({
      preferNative: true,
      maximumAge: 10000,
      timeout: 10000,
      enableHighAccuracy: true,
    })

    // 判断坐标类型进行坐标转换，不然可能会出现坐标偏移的情况
    switch (coordType) {
      case 'WGS84': // GPS 坐标， HTML5返回的就是GPS坐标
      case 'GCJ02': // 火星坐标，在中国地区，高德、GoogleMap都是使用这个格式的坐标
      case 'BD08':  // 百度坐标， 目前Android原生返回的是百度坐标
    }
  } catch (err) {
    if (err instanceof BridgeResponseError) {
      console.log(err.errCode, err.message)
    }
  }
}
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

  private handleTogglePreferNative = (_: object, checked: boolean) => {
    this.params.preferNative = checked
  }

  private handleToggleHAC = (_: object, checked: boolean) => {
    this.params.enableHighAccuracy = checked
  }

  private handleMaximumAgeChange = (
    evt: React.ChangeEvent<{ value: string }>,
  ) => {
    this.params.maximumAge = parseInt(evt.target.value, 10)
  }

  private handleTimeoutChange = (evt: React.ChangeEvent<{ value: string }>) => {
    this.params.timeout = parseInt(evt.target.value, 10)
  }

  private getLocation = async () => {
    try {
      this.res = await api().getLocation(this.params)
    } catch (err) {
      this.error = { code: err.code || err.errCode, message: err.message }
    }
  }
}
