/**
 * 文档首页
 */
import * as React from 'react'
import { Helmet } from 'react-helmet'

export default class Doc extends React.Component {
  public render() {
    return (
      <div>
        <Helmet>
          <title>Doc</title>
        </Helmet>
        <h1>Doc</h1>
      </div>
    )
  }
}
