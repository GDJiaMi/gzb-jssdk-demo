/**
 * SetTitle
 * 设置标题
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import styled from 'utils/styled-components'
import { observable } from 'mobx'
import Code from 'components/Code'
import H2 from 'components/H2'
import DemoSection from 'components/DemoSection'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import api from '@gdjiami/gzb-jssdk'

const Button = styled(RaisedButton)`margin-left: 1em;`

interface Props {
  className?: string
}

@observer
export default class Phone extends React.Component<Props> {
  @observable private value: string = '13750007059'
  @observable private email: string = 'gq-li@mygzb.com'
  public render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>phone</title>
        </Helmet>
        <H2>拨打电话/信息</H2>
        <DemoSection>
          <TextField
            hintText="输入手机号码"
            value={this.value}
            onChange={this.handleChange}
          />
          <Button label="拨打" onClick={this.call} />
          <Button label="发送短信" onClick={this.send} />
          <br />
          <TextField
            hintText="输入邮箱地址"
            value={this.email}
            onChange={this.handleEmailChange}
          />
          <Button label="发送邮件" onClick={this.sendEmail} />
        </DemoSection>
        <DemoSection>
          <H2>示例代码</H2>
          <Code>
            {`
\`\`\`typescript
import Api from '@gdjiami/gzb-jssdk'
const api = Api()
api.phone('13750007059')
api.sms('13750007059')
api.mail('gq-li@mygzb.com')
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

  private handleChange = (evt: React.ChangeEvent<{ value: string }>) => {
    this.value = evt.target.value
  }

  private handleEmailChange = (evt: React.ChangeEvent<{ value: string }>) => {
    this.email = evt.target.value
  }

  private call = () => {
    api().phone(this.value)
  }

  private send = () => {
    api().sms(this.value)
  }

  private sendEmail = () => {
    api().mail(this.email)
  }
}
