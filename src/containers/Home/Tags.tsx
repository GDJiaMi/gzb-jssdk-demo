/**
 * 标签
 */
import styled from 'utils/styled-components'

export const Tags = styled.div``

export const Tag = styled.span`
  display: inline-block;
  padding: .5em;
  font-size: .9em;
  border-radius: 1em;
  background-color: ${props => props.theme.semantic.alert};
  color: white;
  margin: .2em .5em;
`
