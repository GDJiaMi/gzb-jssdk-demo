/**
 * VideoUpload
 * 小视频录制
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
const CodeMap = {
  400: '参数错误',
  403: '客户端无法取得系统权限',
  406: '当前客户端环境不允许执行',
  503: '客户端请求上传文件，可是服务器没有响应或者返回错误',
  504: '上传网络超时',
}

class VideoUpload extends React.Component<Props> {
  private chooseVideo = async () => {
    try {
      const res = await RPC.getInstance().request<
        {},
        { videoId: string; size: string }
      >('video.upload', { maxLength: 10, minLength: 3 })
      return { fileId: res.videoId, size: parseInt(res.size, 10) }
    } catch (err) {
      const code = err.code
      if (code) {
        throw new Error(CodeMap[code])
      }
      throw err
    }
  }

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
          <title>RPC 接口列表</title>
        </Helmet>
        <H2>
          小视频录制<Platforms ios android />
        </H2>
        <DemoSection>
          <RaisedButton label="小视频录制" onClick={this.chooseVideo} />
        </DemoSection>
        <DemoSection>
          <H2>示例代码</H2>
          <Program>
            {`
const CodeMap = {
    400: '参数错误',
    403: '客户端无法取得系统权限',
    406: '当前客户端环境不允许执行',
    503: '客户端请求上传文件，可是服务器没有响应或者返回错误',
    504: '上传网络超时',
}

export async function chooseVideo() {
    try {
        const { RPC } = await import('@gdjiami/gzb-jssdk')
        const res = await RPC.getInstance().request('video.upload', { maxLength: 10, minLength: 3 })
        return { fileId: res.videoId, size: parseInt(res.size, 10) }
    } catch (err) {
        const code = err.code
        if (code) {
            throw new Error(CodeMap[code])
        }
        throw err
    }
}
                    `}
          </Program>
        </DemoSection>
        <DemoSection>
          <H2>文档</H2>
          <Doc>
            {`
► **RPC.getInstance().request**('video.upload', {maxLength: *\`number\`*, minLength: *\`number\`*}): \`void\`

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| maxLength | \`number\`   |  视频最大长度,默认10秒 |
| minLength | \`number\`   |  视频最小长度,默认3秒 |

**Returns**: \`void\`

| Param | Type | Description |
| ------ | ------ | ------ |
| videoId | \`string\`   |  --- |
| size | \`number\`   |  视频大小（字节） |
| length | \`number\`   |  视频长度（秒） |
| thumbnailId | \`number\`   |  缩略图id |
| thumbnailSize | \`number\`   |  --- |
| thumbnailWidth | \`number\`   |  --- |
| thumbnailHeight | \`number\`   |  --- |

**ERROR CODE**

| code | Message | 描述|
|-------|---------|-----| 
| 400| parameter error| 客户端不理解web请求参数的语法（如：最小录制时长大于最大录制时长）。 | 
| 403| privilege grant failed| 客户端无取得系统权限| 
| 406| not allowed | 当前客户端环境不允许执行。例如低于Android 5.0系统版本不支持该功能| 
| 503| request error| 客户端请求上传文件，可是服务器没有响应或者返回错误。| 
| 504| network timeout| 网络超时。客户端上传文件过程中，没有及时从服务器收到响应，上传文件失败。|
                    `}
          </Doc>
        </DemoSection>

        <H2>
          隐藏浏览器标题<Platforms ios android />
        </H2>
        <DemoSection>
          <H2>示例代码</H2>
          <RaisedButton label="测试" onClick={this.hideTitle} />
          <br />
          <Program>{`\
import { RPC } from '@gdjiami/gzb-jssdk'
export async function chooseVideo() {
  RPC.getInstance().request('ui.hideTitle')
}`}</Program>
        </DemoSection>

        <H2>
          最小化浏览器<Platforms ios android />
        </H2>

        <DemoSection>
          <H2>示例代码</H2>
          <RaisedButton label="测试" onClick={this.minimize} />
          <Program>{`\
import { RPC } from '@gdjiami/gzb-jssdk'
export async function chooseVideo() {
  const url = 'http://www.baidu.com'
  RPC.getInstance().request('ui.minimize', {url})
}`}</Program>
        </DemoSection>
      </div>
    )
  }
}

export default VideoUpload
