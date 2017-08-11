/**
 * 组件异步加载指示器
 */
import * as React from 'react'
import { LoadingComponentProps } from 'react-loadable'

export default function ComponentLoading(props: LoadingComponentProps) {
  if (props.isLoading) {
    if (props.timedOut) {
      return <div>Loader Timeout</div>
    } else if (props.pastDelay) {
      return <div>Loading...</div>
    }

    return null
  } else if (props.error) {
    return <div>Error! Component Failed to load</div>
  }

  return null
}
