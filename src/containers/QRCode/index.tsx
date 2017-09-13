/**
 * QRCode
 * 扫码
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import { observable } from 'mobx'
import Code from 'components/Code'
import H2 from 'components/H2'
import DemoSection from 'components/DemoSection'
import RaisedButton from 'material-ui/RaisedButton'
import api, { QRCodeResponse } from '@gdjiami/gzb-jssdk'

interface Props {
  className?: string
}

@observer
export default class ScanQRCode extends React.Component<Props> {
  @observable private result: QRCodeResponse
  public render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>QRCode</title>
        </Helmet>
        <H2>扫码</H2>
        <DemoSection>
          <RaisedButton label="扫码" onClick={this.scan} />
          <br />
          <br />
          <p>{!!this.result && '扫码结果:  ' + this.result.content}</p>
        </DemoSection>
        <DemoSection>
          <H2>示例代码</H2>
          <Code>
            {`
\`\`\`typescript
import api from '@gdjiami/gzb-jssdk'
async scan() {
  try {
    const { content } = await api().scanQRCode()
    console.log('扫码结果', content)
  } catch (err) {
    alert(\`扫码失败: \${err.message}\`)
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

  private scan = async () => {
    try {
      this.result = await api().scanQRCode()
    } catch (err) {
      alert(`扫码失败: ${err.message}`)
    }
  }
}
