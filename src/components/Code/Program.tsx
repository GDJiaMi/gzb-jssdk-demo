/**
 * 源代码渲染
 */
import React from 'react'
import Code from './index'

export default function(props: { children: string }) {
  return (
    <Code>{`
\`\`\`typescript
${props.children}
\`\`\`
  `}</Code>
  )
}
