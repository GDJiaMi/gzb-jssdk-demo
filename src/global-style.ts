/**
 * 定义全局样式
 */
import { injectGlobal } from 'utils/styled-components'
import 'sanitize.css'
import 'highlight.js/styles/tomorrow-night.css'

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  /**
   * 在下面定义全局样式
   */
  html, body, #root {
    width: 100%;
    height: 100%;
  }

  pre {
    margin: 0;
  }
`
