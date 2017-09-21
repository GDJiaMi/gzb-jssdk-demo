/**
 * markdown element
 */
import React from 'react'
import mdit from 'markdown-it'
import hljs from 'highlight.js'

const md = mdit({
  html: true,
  typographer: true,
  breaks: true,
  highlight(str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `
<pre class="hljs">
<code>
${hljs.highlight(lang, str).value}
</code>
</pre>`
      } catch (_) {}
    }
    return ''
  },
})

interface Props {
  children: string
}

export default class Code extends React.PureComponent<Props> {
  public render() {
    const html = { __html: md.render(this.props.children) }
    return <div dangerouslySetInnerHTML={html} />
  }
}
