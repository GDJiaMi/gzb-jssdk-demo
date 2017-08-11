/**
 * 首页
 */
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { List, Item, Title as ItemTitle } from './List'
import { Tags, Tag } from './Tags'

export default class Home extends React.Component {
  public render() {
    return (
      <div>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <h2>特性</h2>
        <List>
          <Item>
            <ItemTitle>快速构建</ItemTitle>
            <p>快速构建项目脚手架, 统一团队技术栈, 开发规范</p>
          </Item>
          <Item>
            <ItemTitle>快速开发</ItemTitle>
            <p>组合最优的工具链, 实现更好的开发体验. 实时反馈, 实时更新</p>
          </Item>
          <Item>
            <ItemTitle>更优的代码质量</ItemTitle>
            <p>
              选用Typescript作为主力开发语言, 更早地发现代码问题, 提升代码可读性, 可维护性.
              另外Typescript在编辑器上的自动补全支持非常强大.
            </p>
          </Item>
          <Item>
            <ItemTitle>i18n支持</ItemTitle>
            <p>基于`react-intl`支持多语言切换</p>
          </Item>
        </List>
        <h2>技术栈</h2>
        <Tags>
          <Tag>React</Tag>
          <Tag>Typescript</Tag>
          <Tag>Mobx</Tag>
          <Tag>React-Intl</Tag>
          <Tag>Styled-Components</Tag>
          <Tag>React-Router(v4)</Tag>
          <Tag>React-Loadable</Tag>
          <Tag>React-Helmet</Tag>
          <Tag>Tslint</Tag>
          <Tag>Stylelint</Tag>
        </Tags>
      </div>
    )
  }
}
