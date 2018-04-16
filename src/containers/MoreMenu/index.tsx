/**
 * 更多按钮菜单
 */
/* tslint:disable:jsx-no-lambda */
import React from 'react'
import { observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import styled from 'utils/styled-components'
import { observable, computed } from 'mobx'
import Program from 'components/Code/Program'
import Doc from 'components/Code/Doc'
import H2 from 'components/H2'
import DemoSection from 'components/DemoSection'
import Platforms from 'components/Platforms'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { parse } from 'utils/common'
import api from '@gdjiami/gzb-jssdk'

const Button = styled(RaisedButton)`margin-left: 1em;`

interface Props {
  className?: string
}

@observer
export default class MoreMenu extends React.Component<Props> {
  private nativeButton: string[] = [
    'refresh',
    'share',
    'copyLink',
    'openWithBrowser',
  ]
  @observable private buttonId: string = 'refresh'
  @observable private buttonVisible: boolean = true
  @computed
  private get setNativeMenuItemParams(): object {
    return {
      id: this.buttonId,
      visible: this.buttonVisible,
    }
  }

  @observable private addedButton: Array<{ title: string; id: string }> = []
  @observable private title: string = '标题'

  public render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>request permission</title>
        </Helmet>
        {this.renderSetNativeMenuItem()}
        {this.renderAddMenuItem()}
        {this.renderRemoveMenuItem()}
        <DemoSection>
          <H2>文档</H2>
          <Doc>{`

###  setNativeMenuItem

控制更多按钮菜单下的原生按钮

► **setNativeMenuItem**(params: *SetNativeMenuItemParams*): \`void\` 

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| params | SetNativeMenuItemParams  |  - |

**Returns:** \`void\`

**Types:**
\`\`\`typescript
interface SetNativeMenuItemParams {
  id: NativeMenuItem
  visible: boolean
}
\`\`\`

---

###  addMenuItem
添加更多菜单项

► **addMenuItem**(title: *\`string\`*, callback: *function*): \`void\`

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| title | \`string\`   | 标题 |
| callback | function   | 回调 |

**Returns:** \`void\`

---

###  removeMenuItem
移除菜单项

► **removeMenuItem**(title: *\`string\`*): \`void\`

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| title | \`string\`   | 标题 |

**Returns:** \`void\`
          `}</Doc>
        </DemoSection>
      </div>
    )
  }

  private renderRemoveMenuItem() {
    return (
      <DemoSection>
        <H2>
          移除按钮(removeMenuItem) <Platforms ios android pc />
        </H2>
        <ul>
          {this.addedButton.map((button, index) => {
            return (
              <li key={button.id}>
                <span>{button.title}</span>
                <FlatButton
                  label="remove"
                  secondary
                  style={{ marginLeft: '1em' }}
                  onClick={this.removeMenuItem(index)}
                />
              </li>
            )
          })}
        </ul>
        {!!this.addedButton.length && (
          <Button label="移除所有按钮" onClick={this.removeAllMenuItems} />
        )}
        示例代码
        <Program>
          {`
import Api from '@gdjiami/gzb-jssdk'
const api = Api()
api.removeMenuItem('标题')
`}
        </Program>
      </DemoSection>
    )
  }

  private renderSetNativeMenuItem() {
    return (
      <DemoSection>
        <H2>
          显示和隐藏默认按钮(setNativeMenuItem) <Platforms ios android pc />
        </H2>
        <SelectField
          floatingLabelText="id"
          value={this.buttonId}
          onChange={(evt, index, value) => (this.buttonId = value)}
        >
          {this.nativeButton.map((key, index) => {
            return <MenuItem key={index} value={key} primaryText={key} />
          })}
        </SelectField>
        <br />
        <Checkbox
          label="visible"
          checked={this.buttonVisible}
          onCheck={() => (this.buttonVisible = !this.buttonVisible)}
        />
        <br />
        示例代码
        <Program>
          {`
import Api from '@gdjiami/gzb-jssdk'
const api = Api()
api.setNativeMenuItem(${JSON.stringify(this.setNativeMenuItemParams)})`}
        </Program>
        <br />
        <Button label="请求" onClick={this.setNativeMenuItem} />
        <br />
      </DemoSection>
    )
  }

  private renderAddMenuItem() {
    return (
      <DemoSection>
        <H2>
          添加按钮(addMenuItem) <Platforms ios android pc />
        </H2>
        <TextField
          hintText="输入标题"
          value={this.title}
          onChange={this.handleTitleChange}
        />
        <br />
        示例代码
        <Program>
          {`
import Api from '@gdjiami/gzb-jssdk'
const api = Api()
api.addMenuItem('${this.title}', () => {/* handle click*/})
            `}
        </Program>
        <br />
        <Button label="添加" onClick={this.addMenuItem} />
        <br />
      </DemoSection>
    )
  }

  private handleTitleChange = (evt: React.ChangeEvent<{ value: string }>) => {
    this.title = evt.target.value
  }

  private setNativeMenuItem = () => {
    console.log('setNativeMenuItem 请求参数', this.setNativeMenuItemParams)
    api().setUpBridge(bridge => {
      bridge.callHandler(
        'setNativeMenuItem',
        this.setNativeMenuItemParams,
        res => {
          console.log('setNativeMenuItem 响应参数', res)
        },
      )
    })
  }

  private removeMenuItem = (index: number) => () => {
    const button = this.addedButton[index]
    const params = { ids: [button.id] }
    console.log('removeMenuItem 请求参数', params)
    this.addedButton.splice(index, 1)
    api().setUpBridge(bridge => {
      bridge.callHandler('removeMenuItem', params)
    })
  }

  private removeAllMenuItems = () => {
    const payload = { ids: this.addedButton.map(({ id }) => id) }
    console.log('removeMenuItem 请求参数', payload)
    this.addedButton = []
    api().setUpBridge(bridge => {
      bridge.callHandler('removeMenuItem', payload)
    })
  }

  private addNativeMenuItem = (params: { id: string; title: string }) => {
    api().setUpBridge(bridge => {
      bridge.callHandler('addMenuItem', params, res => {
        console.log('addMenuItem 响应参数', res)
        const data = parse(res)
        if (data.result === 'true') {
          alert(`${params.title} 点击: ${res}`)
          // 重新见识
          if (this.addedButton.some(({ id }) => id === params.id)) {
            this.addNativeMenuItem(params)
          }
        }
      })
    })
  }

  private addMenuItem = () => {
    const params = {
      id: String(this.addedButton.length),
      title: this.title,
    }
    this.addedButton.push(params)
    this.addNativeMenuItem(params)
    console.log('addMenuItem 请求参数', params)
  }
}
