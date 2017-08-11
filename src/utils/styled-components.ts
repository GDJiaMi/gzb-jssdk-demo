/**
 * 重新导出styled-component 从而让styled可以类型化theme
 */
import * as styledComponents from 'styled-components'
// tslint:disable-next-line:no-duplicate-imports
import { ThemedStyledComponentsModule } from 'styled-components'
import ThemeInterface from '../theme'

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>

export { css, injectGlobal, keyframes, ThemeProvider, ThemeInterface }
export default styled
