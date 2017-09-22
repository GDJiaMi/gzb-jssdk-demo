/**
 * Lab
 * 实验室
 */
/* tslint:disable:jsx-no-lambda */
import React from 'react'
import { observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import styled from 'utils/styled-components'
import { observable, toJS } from 'mobx'
import Code from 'components/Code'
import H2 from 'components/H2'
import DemoSection from 'components/DemoSection'
import Platforms from 'components/Platforms'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import api from '@gdjiami/gzb-jssdk'

// const Button = styled(RaisedButton)`margin-left: 1em;`

const Preview = styled.div`
  display: flex;
  flex-direction: row;

  & > .img {
    width: 150px;
    height: 150px;
    background-size: contain;
    margin: 0.3em;
    filter: brightness(0.4);
  }

  & > .img.active {
    filter: brightness(1);
  }
`

interface Props {
  className?: string
}

@observer
export default class PreviewImg extends React.Component<Props> {
  @observable
  private previewImages: string[] = [
    'http://cnews.chinadaily.com.cn/img/attachement/jpg/site1/20160802/0023ae82c931190a33242c.jpg',
    'http://img1.gtimg.com/ln/pics/hv1/74/76/2201/143139479.jpg',
    'http://cnews.chinadaily.com.cn/img/attachement/jpg/site1/20160802/a41f726b0511190a47032b.jpg',
  ]
  @observable private activeImage: number = 0
  @observable private previewImgRes: string = ''

  public render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>图片预览</title>
        </Helmet>
        <DemoSection>
          <H2>
            图片预览(previewImg) <Platforms ios android pc />
          </H2>
          <TextField
            floatingLabelText="图片1"
            value={this.previewImages[0]}
            onChange={this.handlePreviewImageChange(0)}
          />
          <br />
          <TextField
            floatingLabelText="图片2"
            value={this.previewImages[1]}
            onChange={this.handlePreviewImageChange(1)}
          />
          <br />
          <TextField
            floatingLabelText="图片3"
            value={this.previewImages[2]}
            onChange={this.handlePreviewImageChange(2)}
          />
          <br />
          <SelectField
            floatingLabelText="index"
            value={this.activeImage}
            onChange={(evt, index, value) => (this.activeImage = value)}
          >
            <MenuItem value={0} primaryText="0" />
            <MenuItem value={1} primaryText="1" />
            <MenuItem value={2} primaryText="2" />
          </SelectField>
          <Preview>
            {this.previewImages.map((img, index) => (
              <div
                className={`img ${this.activeImage === index ? 'active' : ''}`}
                key={index}
                style={{ backgroundImage: `url(${img})` }}
              />
            ))}
          </Preview>
          请求参数
          <Code>
            {`
\`\`\`json
{
  "url": [
${this.previewImages.map(s => `    "${s}"`).join(',\n')}
  ],
  "index": ${this.activeImage}
}
\`\`\`
            `}
          </Code>
          <br />
          <RaisedButton label="请求" onClick={this.handlePreviewImageRequest} />
          <br />
          {!!this.previewImgRes && (
            <div>
              返回参数
              <Code>
                {`
\`\`\`json
${this.previewImgRes}
\`\`\`
            `}
              </Code>
            </div>
          )}
        </DemoSection>
        {/* <DemoSection>
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
        </DemoSection> */}
        <DemoSection>
          <H2>文档</H2>
        </DemoSection>
      </div>
    )
  }

  private handlePreviewImageChange = (index: number) => (
    evt: React.ChangeEvent<{ value: string }>,
  ) => {
    this.previewImages[index] = evt.target.value
  }

  private handlePreviewImageRequest = () => {
    const payload = {
      url: toJS(this.previewImages),
      index: this.activeImage,
    }
    console.log('previewImg 请求参数', payload)
    api().setUpBridge(bridge => {
      bridge.callHandler('previewImg', payload, res => {
        this.previewImgRes = res
        console.log('previewImg 响应参数', res)
      })
    })
  }
}
