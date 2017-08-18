/**
 * Icon
 * svg sprite icon
 * @example
 *   import Icon from 'components/Icon'
 *   <Icon src={require('assets/icons/github.svg')} />
 */
import * as React from 'react'
import styled from 'utils/styled-components'

export interface SvgSprite {
  viewBox: string
  id: string
  content: string
}

interface Props {
  className?: string
  src: SvgSprite
}

const Icon: React.StatelessComponent<Props> = props =>
  <svg className={props.className} viewBox={props.src.viewBox}>
    <use xlinkHref={`#${props.src.id}`} />
  </svg>

export default styled(Icon)`
  fill: currentColor;
  width: 1em;
  height: 1em;
`
