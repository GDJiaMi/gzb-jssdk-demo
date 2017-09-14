/**
 * Session
 * 打开会话
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
import FlatButton from 'material-ui/FlatButton'
import _Toggle from 'material-ui/Toggle'
import api, {
  SelectSessionParams,
  SelectSessionResponse,
  BridgeResponseError,
} from '@gdjiami/gzb-jssdk'
/* tslint:disable:jsx-no-lambda */

const Button = styled(RaisedButton)`margin-left: 1em;`
const Toggle = styled(_Toggle)`max-width: 250px;`

interface Props {
  className?: string
}

@observer
export default class Session extends React.Component<Props> {
  @observable private userId: string = 'u116115'
  @observable
  private selectSessionParams: SelectSessionParams = {
    multiple: true,
    title: '选择会话',
  }
  @observable private selectedSession: SelectSessionResponse = []
  public render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>会话</title>
        </Helmet>
        <H2>
          会话选择器<Platforms android ios pc />
        </H2>
        <DemoSection>
          <Toggle
            label="多选"
            toggled={this.selectSessionParams.multiple}
            onToggle={this.handleMultipleToggle}
          />
          <br />
          <TextField
            hintText="输入显示标题"
            value={this.selectSessionParams.title}
            onChange={this.handleTitleChange}
          />
          <Button label="选择会话" onClick={this.selectSession} />
          <br />
          <ul>
            {this.selectedSession.map(session => (
              <li key={session.sessionId}>
                {session.sessionId}({session.sessionType}){' '}
                <FlatButton
                  label="打开会话框"
                  onClick={() =>
                    this.openSession1(session.sessionId, session.sessionType)}
                />
              </li>
            ))}
          </ul>
        </DemoSection>
        <DemoSection>
          <H2>示例代码</H2>
          <Code>
            {`
\`\`\`typescript
import Api, { BridgeResponseError, SelectSessionResponse } from '@gdjiami/gzb-jssdk'
const api = Api()

async function selectionSession(multiple: boolean, title: string): Promise<SelectSessionResponse> {
  try {
    return await api.selectSession({ multiple, title })
  } catch (error) {
    if (error instanceof BridgeResponseError) {
      alert(\`选择会话失败: \${error.errCode}: \${error.message}\`)
    }
  }
}

api(true, '选择会话')
\`\`\`
          `}
          </Code>
        </DemoSection>
        <H2>
          打开会话<Platforms android ios pc />
        </H2>
        <DemoSection>
          <TextField
            hintText="输入用户id"
            value={this.userId}
            onChange={this.handleUserIdChange}
          />
          <Button label="打开单聊会话框" onClick={() => this.openSession1()} />
          <br />
        </DemoSection>
        <DemoSection>
          <H2>示例代码</H2>
          <Code>
            {`
\`\`\`typescript
import Api, { DialogType } from '@gdjiami/gzb-jssdk'
const api = Api()
api().openDialog({ type: DialogType.Chat, id: userID })
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

  private handleMultipleToggle = (e: object, checked: boolean) => {
    this.selectSessionParams.multiple = checked
  }

  private handleTitleChange = (evt: React.ChangeEvent<{ value: string }>) => {
    this.selectSessionParams.title = evt.target.value
  }

  private handleUserIdChange = (evt: React.ChangeEvent<{ value: string }>) => {
    this.userId = evt.target.value
  }

  private selectSession = async () => {
    try {
      const res = await api().selectSession(this.selectSessionParams)
      this.selectedSession = res
    } catch (error) {
      if (error instanceof BridgeResponseError) {
        alert(`选择会话失败: ${error.errCode}: ${error.message}`)
      }
    }
  }

  private openSession1 = (id = this.userId, type?: 'user' | 'chatroom') => {
    api().openDialog({ type: type ? (type === 'user' ? 2 : 1) : 2, id })
  }
}
