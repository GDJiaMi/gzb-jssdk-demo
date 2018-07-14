/**
 * ShowContact
 * 打开名片
 */
import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'utils/styled-components'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Doc from 'components/Code/Doc'
import Program from 'components/Code/Program'
import H2 from 'components/H2'
import DemoSection from 'components/DemoSection'
import Platforms from 'components/Platforms'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import api, { SelectContactResponse } from '@gdjiami/gzb-jssdk'
import { serial, deserial } from 'utils/common'
import lz from 'lz-string'

const Button = styled(RaisedButton)`margin-left: 1em;`

interface Props {
  className?: string
}

@observer
export default class ShowContact extends React.Component<Props> {
  @observable private value: string = 'u116115'
  @observable private tenementId: string
  @observable private items: string
  @observable private itemsError?: Error
  @observable private selectedContact: SelectContactResponse = []

  public componentWillMount() {
    const params = deserial()
    this.tenementId = params.tenementId
    // @ts-ignore
    this.items = params.items ? lz.decompressFromBase64(params.items) : ''
  }

  public render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>联系人</title>
        </Helmet>
        <H2>
          打开名片<Platforms android ios pc />
        </H2>
        <DemoSection>
          <TextField
            hintText="输入用户id"
            value={this.value}
            onChange={this.handleChange}
          />
          <Button label="打开" onClick={this.showContact} />
        </DemoSection>
        <DemoSection>
          <H2>示例代码</H2>
          <Program>
            {`
import Api from '@gdjiami/gzb-jssdk'
const api = Api()
api.openContact(userId)
          `}
          </Program>
        </DemoSection>
        <H2>
          联系人选择器<Platforms android ios pc />
        </H2>
        <DemoSection>
          <TextField
            hintText="输入tenementId"
            value={this.tenementId}
            onChange={this.handleTenementIdChange}
            onBlur={this.saveTenement}
          />
          <br />
          <TextField
            hintText="输入items(可以在PC端编辑，然后复制链接到客户端调试)"
            value={this.items}
            onChange={this.handleItemsChange}
            onBlur={this.validateItems}
            multiLine
            rows={8}
            style={{ width: '100%' }}
            errorText={this.itemsError ? this.itemsError.message : undefined}
          />
          <br />
          <Button label="打开" onClick={this.openContactSelector} />
          <p>
            <ul>
              {this.selectedContact.map(contact => (
                <li key={contact.id}>
                  {contact.id}: {contact.name}
                </li>
              ))}
            </ul>
          </p>
        </DemoSection>
        <DemoSection>
          <H2>示例代码</H2>
          <Program>
            {`
import Api from '@gdjiami/gzb-jssdk'
const api = Api()
async function selectContact() {
  try {
    const data = await api().selectContact({
      user: [],
      type: 'multiple',
      limit: 20,
      tenementId: 't140050483060650196',
    })
    console.log(data[0].name)
  } catch(err) {
    console.log(err)
  }
}
          `}
          </Program>
        </DemoSection>
        <DemoSection>
          <H2>文档</H2>
          <Doc>
            {`
### openContact
► **openContact**(id: *\`string\`*): \`void\`
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| id | \`string\`   |  用户id |

**Returns:** \`void\`

---

###  selectContact
► **selectContact**(params: *SelectContactParams*): \`Promise\`.<SelectContactResponse>
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| params | SelectContactParams  |  - |

**Returns:** \`Promise\`.<SelectContactResponse>

---

### 相关类型定义

\`\`\`typescript
export interface SelectContactParams {
  /**
   * 已选中联系人信息
   */
  user?: Array<{
    id: string
    name: string
  }>
  /**
   * 企业id
   */
  tenementId: string
  /**
   * 限制数，只有在type为multple时有效
   */
  limit?: number
  /**
   * 是否可以取消选择
   */
  unselect?: boolean
  /**
   * 选择类型
   */
  type?: 'single' | 'multiple'
}

type SelectContactResponse = Array<{
  id: string
  name: string
  avatar: string
}>
\`\`\`
          `}
          </Doc>
        </DemoSection>
      </div>
    )
  }

  private handleChange = (evt: React.ChangeEvent<{ value: string }>) => {
    this.value = evt.target.value
  }

  private handleTenementIdChange = (
    evt: React.ChangeEvent<{ value: string }>,
  ) => {
    this.tenementId = evt.target.value
  }

  private saveTenement = () => {
    serial({ tenementId: this.tenementId })
  }

  private validateItems = () => {
    const jsonText = this.items
    try {
      this.itemsError = undefined
      const parsed = JSON.parse(jsonText)
      const formated = JSON.stringify(parsed, undefined, '  ')
      this.items = formated
      serial({ items: lz.compressToBase64(formated) })
    } catch (err) {
      this.itemsError = err
      this.items = jsonText
    }
  }

  private handleItemsChange = (evt: React.ChangeEvent<{ value: string }>) => {
    const jsonText = evt.target.value
    this.items = jsonText
  }

  private showContact = () => {
    api().showContact(this.value)
  }

  private openContactSelector = async () => {
    try {
      const data = await api().selectContact({
        user: [],
        type: 'multiple',
        limit: 20,
        tenementId: this.tenementId,
        items: JSON.parse(this.items),
      })

      this.selectedContact.replace(data)
    } catch (err) {
      console.log(err)
    }
  }
}
