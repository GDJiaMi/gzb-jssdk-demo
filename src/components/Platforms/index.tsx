/**
 * Platforms
 * Platforms
 */
import React from 'react'
import styled from 'utils/styled-components'
import _Icon from 'components/Icon'

const Icon = styled(_Icon)`
  font-size: 1.3em;
  margin-left: 0.5em;
`

const Android = styled(Icon)`color: #179446;`

const PC = styled(Icon)`color: #4e6eb5;`

const IOS = styled(Icon)`color: gray;`

interface Props {
  className?: string
  android?: boolean
  ios?: boolean
  pc?: boolean
}

const Platforms: React.StatelessComponent<Props> = props => (
  <span className={props.className}>
    {props.android && (
      <Android src={require('assets/icons/social-android.svg')} />
    )}
    {props.ios && <IOS src={require('assets/icons/social-apple.svg')} />}
    {props.pc && <PC src={require('assets/icons/social-windows.svg')} />}
  </span>
)

export default styled(Platforms)`
  vertical-align: bottom;
  display: inline-flex;
  align-items: center;
`
