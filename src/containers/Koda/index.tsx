/**
 * 科达视频
 */
import React from 'react'
import { Helmet } from 'react-helmet'
import H2 from 'components/H2'
import Platforms from 'components/Platforms'
import DemoSection from 'components/DemoSection'
import RaisedButton from 'material-ui/RaisedButton'
import Program from 'components/Code/Program'
import Doc from 'components/Code/Doc'
import { RPC } from '@gdjiami/gzb-jssdk'

interface Props {
  className?: string
}

class Koda extends React.Component<Props> {
  private hideTitle = () => {
    RPC.getInstance().request('ui.hideTitle')
  }

  private minimize = () => {
    RPC.getInstance().request('ui.minimize', { url: 'http://www.baidu.com' })
  }

  render() {
    return (
      <div className={this.props.className}>
        <Helmet>
          <title>科达视频</title>
        </Helmet>
        <H2>
          视频播放<Platforms ios android />
        </H2>

        <DemoSection>
          <Doc>{`
调用客户端原生播放器播放视频

### 参数说明

**方法名**: 'video.play'

**请求参数**:

| param    | type   | description                                            |
| -------- | ------ | ------------------------------------------------------ |
| type     | string | 视频类型，keda代表科达                                 |
| protocol | string | 视频协议，可选值webrtc/rtsp/rtmp/hls <br/>这里填webrtc |
| url      | string | 视频播放地址                                           |

<br/>

**错误代码**

| code | message        | decription                                         |
| ---- | -------------- | -------------------------------------------------- |
| 405  | bad request    | 参数有误                                           |
| 406  | not acceptable | 不支持的视频                                       |
| 503  | request error  | 客户端请求播放视频，可是服务器没有响应或者返回错误 |
        `}</Doc>

          <H2>示例代码</H2>
          <Program>{`\
import { RPC } from '@gdjiami/gzb-jssdk'

export async function chooseVideo() {
  try {
    const { RPC } = await import('@gdjiami/gzb-jssdk')
    const res = await RPC.getInstance().request('video.play', {type:'keda', protocol:'webrtc', url:'xxxx'})
    return res
  } catch (err) {
    const code = err.code
    const message = err.message
    throw err
  }
}
          `}</Program>
        </DemoSection>

        <br />
        <br />

        <H2>
          隐藏浏览器标题<Platforms ios android />
        </H2>
        <DemoSection>
          <Doc>{`
### 参数说明

**方法名**： 'ui.hideTitle'

**请求参数**: 无
          `}</Doc>
          <H2>示例代码</H2>
          <RaisedButton label="测试" onClick={this.hideTitle} />
          <br />
          <Program>{`\
import { RPC } from '@gdjiami/gzb-jssdk'
export async function chooseVideo() {
  RPC.getInstance().request('ui.hideTitle')
}`}</Program>
        </DemoSection>

        <br />
        <br />

        <H2>
          最小化浏览器<Platforms ios android />
        </H2>

        <DemoSection>
          <Doc>
            {`
类似“微信公告浮窗”功能，让用户最小化H5页面后，可便捷回到原来页面

### 参数说明

**方法名**: 'ui.minimize'

**请求参数**:
- *url*: 点击悬浮返回的页面地址，若需单点登陆，传值请参考"服务端消息推送URL规范"
            `}
          </Doc>

          <H2>示例代码</H2>
          <br />
          <RaisedButton label="测试" onClick={this.minimize} />
          <br />
          <Program>{`\
import { RPC } from '@gdjiami/gzb-jssdk'
export async function chooseVideo() {
  const url = 'http://www.baidu.com'
  RPC.getInstance().request('ui.minimize', {url: url})
}`}</Program>
        </DemoSection>
      </div>
    )
  }
}

export default Koda
