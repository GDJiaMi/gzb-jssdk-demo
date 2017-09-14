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
import Platforms from 'components/Platforms'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import api from '@gdjiami/gzb-jssdk'

const Button = styled(RaisedButton)`margin-left: 1em;`

interface Props {
  className?: string
}

@observer
export default class SetTitle extends React.Component<Props> {
  @observable private value: string = '标题'
  public render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>setTitle</title>
        </Helmet>
        <H2>
          设置标题 <Platforms ios android pc />
        </H2>
        <DemoSection>
          <TextField
            hintText="输入标题"
            value={this.value}
            onChange={this.handleChange}
          />
          <Button label="设置" onClick={this.setTitle} />
        </DemoSection>
        <DemoSection>
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

  private setTitle = () => {
    api().setTitle(this.value)
  }
}
