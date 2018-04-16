/**
 * chooseImage
 * 选择图片
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import styled from 'utils/styled-components'
import { observable } from 'mobx'
import Doc from 'components/Code/Doc'
import Program from 'components/Code/Program'
import H2 from 'components/H2'
import DemoSection from 'components/DemoSection'
import Platforms from 'components/Platforms'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'
import api, {
  ChooseImgResponse,
  ChooseImgParams,
  BridgeResponseError,
} from '@gdjiami/gzb-jssdk'
/* tslint:disable:jsx-no-lambda */

const Preview = styled.img`
  max-width: 90%;
  width: 300px;
  padding: 2em;
`

interface Props {
  className?: string
}

@observer
export default class ChooseImage extends React.Component<Props> {
  @observable
  private params: ChooseImgParams = {
    quality: 80,
    target: 500,
    targetType: 'width',
    actionType: 'default',
    maxSizeKb: 3000,
  }
  @observable private response: ChooseImgResponse
  public render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>选择图片</title>
        </Helmet>
        <H2>
          选择图片<Platforms pc ios android />
        </H2>
        <DemoSection>
          <TextField
            hintText="图片质量"
            floatingLabelText="quality(0-100)"
            value={this.params.quality}
            onChange={this.handleChange('quality')}
          />
          <br />
          <TextField
            floatingLabelText="target(number)"
            value={this.params.target}
            onChange={this.handleChange('target')}
          />
          <br />
          <SelectField
            floatingLabelText="target"
            value={this.params.targetType}
            onChange={(e, i, value) => (this.params.targetType = value)}
          >
            <MenuItem value="default" primaryText="default" />
            <MenuItem value="width" primaryText="width" />
            <MenuItem value="height" primaryText="height" />
          </SelectField>
          <br />
          <TextField
            floatingLabelText="maxSizeKb(number)"
            value={this.params.maxSizeKb}
            onChange={this.handleChange('maxSizeKb')}
          />
          <br />
          <SelectField
            floatingLabelText="actionType"
            value={this.params.actionType}
            onChange={(e, i, value) => (this.params.actionType = value)}
          >
            <MenuItem value="default" primaryText="default" />
            <MenuItem value="camera" primaryText="camera" />
            <MenuItem value="gallery" primaryText="gallery" />
          </SelectField>

          <br />
          <RaisedButton label="选择" onClick={this.choose} />
          <br />
          {!!this.response && (
            <ul>
              <li>width: {this.response.width}</li>
              <li>height: {this.response.height}</li>
              <li>name: {this.response.name}</li>
              <li>quality: {this.response.quality}</li>
              <li>extension: {this.response.extension}</li>
              <li>
                preview: <br />
                <Preview src={this.response.dataUrl} />
              </li>
            </ul>
          )}
        </DemoSection>
        <DemoSection>
          <H2>示例代码</H2>
          <Program>
            {`
import Api, { BridgeResponseError } from '@gdjiami/gzb-jssdk'
const api = Api()
async function chooseImage(){
  try {
    const { dataUrl } = await api().chooseImg()
    preview(dataUrl)
  } catch (err) {
    if (err instanceof BridgeResponseError) {
      alert(\`图片选择失败: \${err.errCode}: \${err.message}\`)
    }
  }
}`}
          </Program>
        </DemoSection>
        <DemoSection>
          <H2>文档</H2>
          <Doc>
            {`
► **chooseImg**(params?: *ChooseImgParams*): \`Promise\`< ChooseImgResponse>

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| params | ChooseImgParams  |  - |

**Returns:** \`Promise\`< ChooseImgResponse>

**Types:**

\`\`\`typescript
type ImageType = 'bmp' | 'gif' | 'jpg' | 'png'
/**
 * 选择图片请求参数
 */
interface ChooseImgParams {
  /**
   * 图片质量，1 - 100
   */
  quality?: number
  /**
   * 设置缩放后的边大小
   */
  target?: number
  /**
   * 设置target应用到的边, 默认为default
   */
  targetType?: 'default' | 'width' | 'height'
  /**
   * 操作类型， camera 打开相机， gallery打开相册. 
   * 默认为default，弹出一个actionsheet， 由 * 用户自主选择
   */
  actionType?: 'default' | 'camera' | 'gallery'
  /**
   * 图片扩展类型
   */
  extType?: ImageType[]
  /**
   * 最大体积， 单位为kb
   */
  maxSizeKb?: number
  /**
   * 选中后返回的图片格式(如果没有指定, 默认返回jpeg类型)
   */
  returnExt?: ImageType;
}

/**
 * 选择图片返回数据
 */
export interface ChooseImgResponse {
  width: number
  height: number
  name?: string
  quality: number
  extension: ImageType
  dataUrl: string
}
\`\`\`
`}
          </Doc>
        </DemoSection>
      </div>
    )
  }

  private handleChange = (key: string) => (
    evt: React.ChangeEvent<{ value: string }>,
  ) => {
    this.params[key] = evt.target.value
  }

  private choose = async () => {
    try {
      console.log('图片选择请求参数', this.params)
      const res = await api().chooseImg(this.params)
      console.log('图片选择响应参数', res)
      this.response = res
    } catch (err) {
      if (err instanceof BridgeResponseError) {
        alert(`图片选择失败: ${err.errCode}: ${err.message}`)
      }
    }
  }
}
