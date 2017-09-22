/**
 * 权限请求
 */
/* tslint:disable:jsx-no-lambda */
import React from 'react'
import { observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import styled from 'utils/styled-components'
import { observable, computed } from 'mobx'
import Code from 'components/Code'
import H2 from 'components/H2'
import DemoSection from 'components/DemoSection'
import Platforms from 'components/Platforms'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import api from '@gdjiami/gzb-jssdk'

const Button = styled(RaisedButton)`margin-left: 1em;`

interface Props {
  className?: string
}

@observer
export default class RequestPermission extends React.Component<Props> {
  @observable private res: string = ''
  @observable private camera: boolean = true
  @observable private location: boolean = false
  @computed
  private get params(): object {
    const params: { permissions: string[] } = { permissions: [] }
    if (this.camera) {
      params.permissions.push('CAMERA')
    }
    if (this.location) {
      params.permissions.push('LOCATION')
    }
    return params
  }
  public render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>request permission</title>
        </Helmet>
        <H2>
          权限请求(requestPermissionAndroid) <Platforms android />
        </H2>
        <DemoSection>
          <Checkbox
            label="CAMERA"
            checked={this.camera}
            onCheck={() => (this.camera = !this.camera)}
          />
          <Checkbox
            label="LOCATION"
            checked={this.location}
            onCheck={() => (this.location = !this.location)}
          />
          请求参数
          <Code>
            {`
\`\`\`json
${JSON.stringify(this.params)}
\`\`\`
            `}
          </Code>
          <br />
          <Button label="请求" onClick={this.request} />
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

  private request = () => {
    console.log('requestPermissionAndroid 请求参数', this.params)
    api().setUpBridge(bridge => {
      bridge.callHandler('requestPermissionAndroid', this.params, res => {
        console.log('requestPermissionAndroid 响应参数', this.params)
        this.res = res
      })
    })
  }
}
