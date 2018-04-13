/**
 * Location To
 * 打开指定链接
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import styled from 'utils/styled-components'
import { observable } from 'mobx'
import Program from 'components/Code/Program'
import Doc from 'components/Code/Doc'
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
export default class LocationTo extends React.Component<Props> {
  @observable private value: string = 'http://mygzb.com'
  public render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>setTitle</title>
        </Helmet>
        <H2>
          打开指定链接 <Platforms pc android ios />
        </H2>
        <DemoSection>
          <p>当showModel为outer时使用系统浏览器打开指定链接，当showModel为inner时在应用内打开</p>
          <TextField
            hintText="输入URL"
            value={this.value}
            onChange={this.handleChange}
          />
          <Button label="跳转(Outer)" onClick={this.goOuter} />
          <Button label="跳转(inner)" onClick={this.goInner} />
        </DemoSection>
        <DemoSection>
          <H2>示例代码</H2>
          <Program>
            {`
import Api from '@gdjiami/gzb-jssdk'
const api = Api()
const url = 'http://mygzb.com'
// 快捷方式， 以默认的outer方式打开链接
api.locationTo(url)
// 等价于
api.locationTo({ url, showModel: 'outer' })

// 应用打开
api.locationTo({ url, showModel: 'inner' })
          `}
          </Program>
        </DemoSection>
        <DemoSection>
          <H2>文档</H2>
          <Doc>{`
► **locationTo**(params: *LocationToParams⎮\`string\`*): \`void\`

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| params | LocationToParams⎮\`string\`   |  请求参数，可以是字符串或对象， showMode 为inner时以应用内webview形式打开为outer时使用系统浏览器打开, 默认为outer |

**Returns:** \`void\`

---

### LocationToParams
打开指定连接请求参数
**●  showMode**:  *"inner"⎮"outer"*
**●  url**:  *\`string\`* 
          `}</Doc>
        </DemoSection>
      </div>
    )
  }

  private handleChange = (evt: React.ChangeEvent<{ value: string }>) => {
    this.value = evt.target.value
  }

  private goOuter = () => {
    api().locationTo({
      url: this.value,
      showMode: 'outer',
    })
  }

  private goInner = () => {
    api().locationTo({
      url: this.value,
      showMode: 'inner',
    })
  }
}
