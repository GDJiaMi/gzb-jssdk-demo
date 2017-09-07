/**
 * Button
 * 类型化后的styled-component显然没有"未类型化"的优雅, 但是代码的可靠性高. 如果不需要
 * 检查props, 就不需要无状态组件包装
 */
import * as React from 'react'
import styled, { ThemeInterface } from 'utils/styled-components'

interface ButtonProps {
  color?: keyof ThemeInterface['semantic']
  className?: string
}

const Button: React.StatelessComponent<ButtonProps> = props => (
  <button className={props.className}>{props.children}</button>
)

export default styled(Button)`
  background-color: ${props => props.theme.semantic[props.color || 'primary']};
  color: white;
  border: none;
  font-size: 1.05rem;
  padding: 0.4em 1em;
  border-radius: 1em;
  outline: none;
  &:active {
    opacity: 0.6;
  }
`
