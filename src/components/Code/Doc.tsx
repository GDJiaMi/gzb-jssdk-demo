/**
 * 文档渲染
 */
import React from 'react'
import styled from 'styled-components'
import Code from './index'

const Wrapper = styled(Code)`
  font-size: 15px;
  & p,
  & blockquote,
  & ul,
  & ol,
  & dl,
  & table,
  & pre {
    margin-top: 0;
    margin-bottom: 16px;
  }

  & table {
    display: block;
    width: 100%;
    overflow: auto;
  }

  & table th {
    font-weight: 600;
  }

  & table th,
  & table td {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
  }

  & table tr {
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
  }

  & table tr:nth-child(2n) {
    background-color: #f6f8fa;
  }

  & table img {
    background-color: transparent;
  }

  & hr {
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: #e1e4e8;
    border: 0;
  }
  & code,
  & tt {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
  }
`

export default function(props: { children: string }) {
  return <Wrapper>{props.children}</Wrapper>
}
