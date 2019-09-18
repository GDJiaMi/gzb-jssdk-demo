/**
 * 源代码渲染
 */
import React from 'react'
import Code from './index'

export default function(props: { children: string; type?: string }) {
  return (
    <Code>{`
\`\`\`${props.type || 'typescript'}
${props.children}
\`\`\`
  `}</Code>
  )
}
