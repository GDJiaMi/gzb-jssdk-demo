import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import Code from 'components/Code'
import H2 from 'components/H2'
import DemoSection from 'components/DemoSection'
import Platforms from 'components/Platforms'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import api from '@gdjiami/gzb-jssdk'

@observer
export default class OpenVideo extends React.Component {
  @observable url: string = 'http://www.w3school.com.cn/i/movie.mp4'
  public render() {
    return (
      <div>
        <Helmet>
          <title>打开视频</title>
        </Helmet>
        <DemoSection>
          <H2>
            打开视频
            <Platforms android ios pc />
          </H2>
          <TextField
            floatingLabelText="url"
            value={this.url}
            onChange={this.handleUrlChange}
          />
          <br />
          <RaisedButton label="请求" onClick={this.openVideo} />
        </DemoSection>
        <DemoSection>
          <Code>
            {`
\`\`\`typescript
import api from '@gdjiami/gzb-jssdk'
api().openVideo(url)
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

  private handleUrlChange = (evt: React.ChangeEvent<{ value: string }>) => {
    this.url = evt.target.value
  }

  private openVideo = () => {
    api().openVideo(this.url)
  }
}
