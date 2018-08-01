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
import Doc from 'components/Code/Doc'
import H2 from 'components/H2'
import H3 from 'components/H3'
import DemoSection from 'components/DemoSection'
import Platforms from 'components/Platforms'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import _Chip from 'material-ui/Chip'
import _Toggle from 'material-ui/Toggle'
import api, {
  SessionType,
  SelectSessionParams,
  SelectSessionResponse,
  BridgeResponseError,
} from '@gdjiami/gzb-jssdk'
/* tslint:disable:jsx-no-lambda */

const Button = styled(RaisedButton)`margin-left: 1em;`
const Toggle = styled(_Toggle)`max-width: 250px;`
const Chip = styled(_Chip)`margin: 0.5em !important;`

interface Props {
  className?: string
}

const SessionTypeList = [
  { value: 'user', label: 'user(最近联系人(用户)，组织架构，我的好友)' },
  { value: 'chatroom', label: 'chatroom(最近联系人(群组))' },
  { value: 'publicAccount', label: 'publicAccount(公众账号)' },
  { value: 'localContact', label: 'localContact(手机联系人)' },
  { value: 'visitor', label: 'visitor(访客)' },
]

@observer
export default class Session extends React.Component<Props> {
  @observable private userId: string = 'u116115'
  @observable private type: number = 2
  @observable
  private selectSessionParams: SelectSessionParams = {
    multiple: true,
    title: '选择会话',
    sessionType: [],
    limit: undefined,
    unselect: true,
    tenementId: undefined,
    selected: [],
  }
  @observable private selectedSession: SelectSessionResponse = []
  public render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>会话</title>
        </Helmet>
        <H2>
          1. 会话选择器<Platforms android ios pc />
        </H2>
        <DemoSection>
          <Toggle
            label="多选"
            toggled={this.selectSessionParams.multiple}
            onToggle={this.handleMultipleToggle}
          />
          <br />
          <TextField
            floatingLabelText="标题"
            value={this.selectSessionParams.title}
            onChange={this.handleTitleChange}
          />
          <br />
          <SelectField
            multiple
            floatingLabelText="会话类型"
            value={[...this.selectSessionParams.sessionType]}
            onChange={(e, i, value) => {
              this.selectSessionParams.sessionType = value
            }}
          >
            {SessionTypeList.map(i => (
              <MenuItem
                key={i.value}
                value={i.value}
                primaryText={i.label}
                checked={
                  (this.selectSessionParams.sessionType || [])
                    .indexOf(i.value as SessionType) !== -1
                }
                insetChildren
              />
            ))}
          </SelectField>
          <br />
          <TextField
            floatingLabelText="最多可选择数目"
            value={this.selectSessionParams.limit}
            onChange={(e: React.ChangeEvent<{ value: string }>) => {
              const num =
                e.target.value.trim() === ''
                  ? undefined
                  : parseInt(e.target.value, 10)
              this.selectSessionParams.limit =
                num == null ? num : Number.isNaN(num) ? undefined : num
            }}
          />
          <br />
          <Toggle
            label="是否可以取消选择"
            toggled={this.selectSessionParams.unselect}
            onToggle={(e, c) => (this.selectSessionParams.unselect = c)}
          />
          <br />
          <TextField
            floatingLabelText="企业id"
            value={this.selectSessionParams.tenementId}
            onChange={(e: React.ChangeEvent<{ value: string }>) => {
              this.selectSessionParams.tenementId = e.target.value
            }}
          />
          <br />
          <br />
          <label>已选中会话:</label>
          <br />
          {(this.selectSessionParams.selected || []).map(i => (
            <Chip key={i.sessionId}>
              {i.name}({i.sessionId}:{i.sessionType})
            </Chip>
          ))}
          <a onClick={this.selectSelected} href="#">
            选择
          </a>
          <br />
          <br />
          <br />
          <Button label="开始选择" onClick={this.selectSession} />
          <br />
          <br />
          <H3>请求参数</H3>
          <Code>
            {`
\`\`\`json
${JSON.stringify(this.selectSessionParams, undefined, 2)}
\`\`\`
          `}
          </Code>
          <H3>响应</H3>
          <Code>
            {`
\`\`\`json
${JSON.stringify(this.selectedSession || [], undefined, 2)}
\`\`\`
          `}
          </Code>
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
          <H3>示例代码</H3>
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
          2. 打开会话<Platforms android ios pc />
        </H2>
        <DemoSection>
          <TextField
            hintText="输入用户id"
            value={this.userId}
            onChange={this.handleUserIdChange}
          />
          <br />
          <SelectField
            floatingLabelText="type"
            value={this.type}
            onChange={(e, i, value) => (this.type = value)}
          >
            <MenuItem value={1} primaryText="群聊" />
            <MenuItem value={2} primaryText="单聊" />
            <MenuItem value={3} primaryText="公告广播" />
            <MenuItem value={4} primaryText="访客" />
          </SelectField>
          <br />
          <Button label="打开会话框" onClick={() => this.openSession()} />
        </DemoSection>
        <DemoSection>
          <H3>示例代码</H3>
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
          <Doc>
            {`
###  selectSession
用户获取会话id

► **selectSession**(params?: *SelectSessionParams*): \`Promise\`<SelectSessionResponse>

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| params | SelectSessionParams   |  参数 |

**Returns:** \`Promise\`< SelectSessionResponse>

**Types:**
\`\`\`typescript

/**
 * 会话类型
 */
export type SessionType =
  | 'user'
  | 'chatroom'
  | 'publicAccount'
  | 'localContact'
  | 'visitor'

/**
 * 选择会话请求参数
 */
interface SelectSessionParams {
  /**
   * 是否支持多选
   */
  multiple?: boolean
  /**
   * 对话框显示的标题
   */
  title?: string
  /**
   * 选择会话的类型
   */
  sessionType?: SessionType[]
  /**
   * 限制
   */
  limit?: number
  /**
   * 已选择的会话
   */
  selected?: GZBSession[]
  /**
   * 是否可以取消已选择的会话
   */
  unselect?: boolean
  tenementId?: string
}

/**
 * 选择会话响应参数
 */
type SelectSessionResponse = Array<{
  sessionId: string
  sessionType: 'user' | 'chatroom'
  icon?: string
  name?: string
}>
\`\`\`

---

###  openDialog

► **openDialog**(params: *DialogParams*): \`void\`

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| params | DialogParams  |  选项<br/>+ type: 会话类型, 1 群聊 2 单聊 3公告广播<br/>+ id: 会话ID， 群组id或个人id<br/>+ messageId: //消息记录ID |

**Returns:** \`void\`

**Types:**

\`\`\`typescript
/**
 * 会话类型
 */
enum DialogType {
  /**
   * 群聊
   */
  GroupChat = 1,
  /**
   * 单聊
   */
  Chat,
  /**
   * 公告广播
   */
  Announcement,
  /**
   * 打开访客聊天窗口, id为访客id
   */
  Visitor,
}

/**
 * 打开会话框请求参数
 */
interface DialogParams {
  type: DialogType
  id: string
  messageId?: string
}
\`\`\`
          `}
          </Doc>
        </DemoSection>
      </div>
    )
  }

  private selectSelected = async (e: React.ChangeEvent<any>) => {
    e.preventDefault()
    try {
      const res = await api().selectSession({
        sessionType: this.selectSessionParams.sessionType,
        title: '选择已选',
      })
      this.selectSessionParams.selected = res
    } catch (error) {
      console.log('选择会话失败', error)
    }
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

  private openSession1 = (id = this.userId, type?: SessionType) => {
    api().openDialog({ type: type ? (type === 'user' ? 2 : 1) : 2, id })
  }

  private openSession = () => {
    api().openDialog({ id: this.userId, type: this.type })
  }
}
