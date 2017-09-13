/**
 * ShowContact
 * 打开名片
 */
import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'utils/styled-components'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Code from 'components/Code'
import H2 from 'components/H2'
import DemoSection from 'components/DemoSection'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import api, { SelectContactResponse } from '@gdjiami/gzb-jssdk'

const Button = styled(RaisedButton)`margin-left: 1em;`

interface Props {
  className?: string
}

@observer
export default class ShowContact extends React.Component<Props> {
  @observable private value: string = 'u116115'
  @observable private selectedContact: SelectContactResponse = []
  public render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>联系人</title>
        </Helmet>
        <H2>打开名片</H2>
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
          <Code>
            {`
\`\`\`typescript
import Api from '@gdjiami/gzb-jssdk'
const api = Api()
api.showContact(userId)
\`\`\`
          `}
          </Code>
        </DemoSection>
        <H2>联系人选择器</H2>
        <DemoSection>
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
          <Code>
            {`
\`\`\`typescript
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

  private showContact = () => {
    api().showContact(this.value)
  }

  private openContactSelector = async () => {
    const data = await api().selectContact({
      user: [],
      type: 'multiple',
      limit: 20,
      tenementId: 't140050483060650196',
    })

    this.selectedContact.replace(data)
  }
}
