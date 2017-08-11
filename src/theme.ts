/**
 * 定义主题
 */
export default interface ThemeInterface {
  semantic: {
    primary: string
    secondary: string
    success: string
    warning: string
    alert: string
  }
  grayScale: {
    lightGray: string
    mediumGray: string
    darkGray: string
    black: string
    white: string
  }
}

// 语义化颜色调色盘
export const semantic: ThemeInterface['semantic'] = {
  primary: '#1779ba',
  secondary: '#767676',
  success: '#3adb76',
  warning: '#ffae00',
  alert: '#dc0000',
}

// 灰阶颜色
export const grayScale: ThemeInterface['grayScale'] = {
  lightGray: '#e6e6e6',
  mediumGray: '#cacaca',
  darkGray: '#8a8a8a',
  black: '#0a0a0a',
  white: '#fefefe',
}
