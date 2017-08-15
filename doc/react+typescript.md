# 使用Typescript 书写React组件
React的类型声明文件定义在`@types/react`包中, 通过以下命令进行安装:
```shell
yarn add @types/react -D
```

## 类组件
```typescript
import * as React from 'react'

// 声明Props类型
interface FooProps {
  foo: string
  bar: number
  baz?: number  // 可选props
}

interface FooState {
  baz: boolean
}

class Foo extends React.Component<FooProps, FooState> {
  // 定义默认的props
  static defaultProps: Partial<FooProps> = {
    baz: 1
  }
  // 定义state
  state = {
    baz: true
  }
  render() {
    return <h1>hello world</h1>
  }
}
```

除了使用泛型的语言, 还可以使用实例变量声明的语法, 两者是等价的, Typescript可以从实例变量的类型中推断泛型变量的类型.

```typescript
class Foo extends React.Component<FooProps, FooState> {
  // 定义默认的props
  static defaultProps: Partial<FooProps> = {
    baz: 1
  }
  // 声明props
  props: FooProps
  // 定义state
  state: FooState = {
    baz: true
  }
  render() {
    return <h1>hello world</h1>
  }
```

## 声明React事件的类型
```typescript
class MyInput extends React.Component {
  props: {
    value: string
    onChange: (value: string) => void
  }
  public render() {
    return <input onChange={this.handleInputChange} value={this.props.value} />
  }

  /**
   * 处理onChange事件, 注意这些方法是私有的, 不应该暴露到外部
   * 使用arrow-method 语法来绑定函数的上下文
   * 一般编辑器都可以通过点击链接到类型的声明位置. 比如在VSCode中, 可以按住(Ctrl
   * in Windows, option in Mac)点击上面的onChange props. 就会跳转到onChange回
   * 调函数的类型声明位置
   */
  private handleInputChange = (
    event: React.ChangeEvent<{ value: string }>
  ) => {
    this.props.onChange(event.target.value)
  }
}
```

## 声明 refs的类型
```typescript
class MyComponent extends React.Component {
  private button: HTMLButtonElement | null

  public render() {
    return <button ref={el => this.button = el}>Toggle</button>;
  }
}
```


## 声明无状态组件
无状态组件和普通的函数类型声明没什么区别
```typescript
const MyComponent = (props: { foo: string }) => {
  return <div>{props.foo}</div>
}
```

如果要添加`propTypes`或`defaultProps` 这些属性的话, 则需要这样定义:
```typescript
import * as React from 'react'
interface Props {
  foo: string
}

const MyComponent: React.StatelessComponent<Props> = props => {
  return <div>{props.foo}</div>
}

MyComponent.defaultProps = {
  foo: 'hello',
}

export default MyComponent
```