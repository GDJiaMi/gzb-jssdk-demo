/**
 * 基本格式
 */
/* tslint:disable:no-console max-classes-per-file*/

// BAD(indent)
const badIndent = {
    a: 'string',
}

// GOOD: 统一使用两个空格进行缩进
const goodIndent = {
  a: 'string',
}


// BAD(align)
declare function foo(
  a: number,
  b: string,
c: boolean,
  d: { a: number; b: string }
)

interface Foo {
  a: number,
    b: string,
}

// GOOD: 当单行无法容下参数声明时, 在多行显示, 且参数必须对齐. 同理, 类成员, 数组成员
// 接口成员也需要对齐
declare function fooo(
  a: number,
  b: string,
  c: boolean,
  d: { a: number; b: string }
)

interface Fooo {
  a: number,
  b: string,
}

// BAD(quotemark)
const str = "string"
// GOOD: 使用单引号
const stro = 'string'

// BAD(quotemark)
function jsx() {
  return <div str='string' />
}
// GOOD; 对于JSX, 字符串是使用双引号, 这是遵循XML的规范
function jsx() {
  return <div str="string" />
}

// BAD(semicolon)
const withSemicolon = 'strig';
// GOOD: 不使用分号
const withSemicolono = 'strig'

// BAD(max-line-length)
const veryverylongArray = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'night']
// GOOD: 为了更好的显示代码和预览代码, 最大行宽不超过80
const veryverylongArrayo = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
]

// GOOD: (max-file-line-count) 为了更好地阅读和定位代码, 当你的文件超过700行时,就需要
// 考虑将文件分割为多个文件了

// BAD(trailing-comma)
const notrailingWhitespace = {
  foo: 'string',
  bar: 1
}
// GOOD: 对于跨越多行的数组字面量, 对象字面量, import, export, type字面量
// 函数调用实参, 都应该尾随逗号,
// 以让diff输出更加简洁
const trailingWhitespace = {
  foo: 'string',
  bar: 1,
}



/**
 * 箭头函数
 */
// BAD(arrow-return-shorthand)
const arrowFunction = (i) => i 

// GOOD: 只有一个参数时,可以省略括号
const arrowFunctiono = i => i 

// BAD(arrow-return-shorthand)
const shorthandReturn = () => { return true }

// GOOD: 如果可以尽量使用简写的返回
const shorthandReturno = () => true

/**
 * 函数
 */
// BAD(newline-before-return)
function newLineBeforeReturn() {
  const x = 1
  const y = 2
  return x * y
}

// GOOD: 在跨越多行的块中返回时, 在return之前加入空行
function newLineBeforeReturn() {
  const x = 1
  const y = 2

  return x * y
}

// BAD(new-parens)
let date = new Date
// GOOD: new 操作始终加上()
date = new Date()

// BAD(space-before-function-paren)



/**
 * 对象
 */
// BAD(object-literal-shorthand)
const obj = {
  'foo': 'string',
  'foo bar': 1,
}

// GOOD: 只有在必要时, 才添加引号
const objo = {
  foo: 'string',
  'foo bar': 1,
}

// BAD(object-literal-shorthand)
const shorthandObj = {
  obj: obj,
  foo: 'string',
}

// GOOD: 优先使用对象简写模式
const shorthandObjo = {
  obj,
  foo: 'string',
}

// BAD(prefer-object-spread)
const obj1 = {
  a: 1,
  b: 2,
}
let objectAssign = Object.assign({}, obj1)

// GOOD: 优先使用object spread 语法
let objectSpread = {...obj1}


/**
 * 操作符/表达式
 */
// BAD(binary-expression-operand-order)
const x = 1
const binaryOperation = 1 + x

// GOOD: 二元操作符中的字面量应该始终在变量的右边
const binaryOperationo = x + 1

// BAD(no-boolean-literal-compare)
const ok: boolean = true
let baz = ok === true ? 'foo' : 'baz'

// GOOD: 不要比较boolean 字面量
baz = ok ? 'foo' : 'baz'

// BAD(prefer-switch)
const type: string = 'foo'
if (type === 'foo') {
  console.log('foo')
} else if (type === 'bar') {
  console.log('bar')
} else if (type === 'baz') {
  console.log('baz')
} else {
  console.log('default')
}

// GOOD: 当使用if语句比较超过三个时, 考虑使用switch
switch (type) {
  case 'foo':
    console.log('foo')
    break
  case 'bar':
    console.log('bar')
    break
  case 'baz':
    console.log('baz')
    break
  default:
    console.log('default')
}

// BAD(prefer-template)
const hello = 'hello'
const world = 'world'
let temp = 'print' + hello + ' ' + world

// GOOD: 优先使用字符串模板
temp = `print${hello} ${world}`

/**
 * 命名规则
 */
// BAD(class-name)
declare class className {}

// GOOD: 类名始终未PascalCased形式
declare class ClassName {}  // tslint:disable-line:max-classes-per-file

// BAD(interface-name)
interface IInterfaceName {}

// GOOD: typescript 官方不建议为接口添加I前缀, 尽管对Java/C#程序员来说是很正常的事情. 
// JavaScript标准库接口的惯例是没有I开始的,比如Window, Document
// 和类一样, 接口使用PascalCased格式
interface InterfaceName {}

/**
 * 注释和文档
 */
//BAD(comment-format)
// GOOD: 前面必须有空格

// GOOD: 每个文件开头必须提供关于这个文件的注释.说明文件的内容, TODO, 更新日期, 权限等信息
// GOOD: 使用JSDoc格式对代码进行文档化

/**
 * 模块
 */
// BAD
import IReact from 'react'

// GOOD: 导入默认导出, 最好匹配库默认的导出名
import React from 'react'

// BAD(import-blacklist)
import _ from 'lodash'

// GOOD: 为了减少打包体积, 避免引入整个模块, 而是按需引入需要的子模块. 典型的应用就是lodash
import findIndex from 'lodash/findIndex'

// BAD
import myIcon from 'assets/icons/github.svg'

// GOOD: 为了区分静态资源和JavaScript模块, 我们使用require 来加载静态资源, 使用import来
// 导入Javascript模块
import Foo from './path/to/foo'

// 导入静态资源
<Icon src={require('assets/icons/myicon.svg')} />
<img src={require('assets/images/bg.png')} />

// BAD
// container/Foo/bar.ts
import Baz from '../../components/Baz'

// GOOD: 优先使用非相对路径来导入模块, 从而避免'路径地狱'. 使用相对路径还不利于模块的移动.
// 通过设置tsconfig.json的paths选项和webpack的resolve.modules 或resolve.alias 来实现模块查找
// 比如将src的根目录设置为node模块的查找目录
import Baz from 'components/Baz'

// BAD
require.ensure(['mymodule'], require => {
  const myModule = require('mymodule')
  // ...
})

// GOOD: 避免使用webpack提供的非标准的模块加载语法, 尽量使用ES6模块
import('mymodule').then(module => {/*...*/})

/**
 * 接口
 */
// BAD(interface-over-type-literal)
type t = {
  foo: number,
  bar: string,
}

// GOOD: 优先使用接口来代替type, 因为接口可以被实现, 扩展和合并
interface To {
  foo: number,
  bar: string,
}


/**
 * 类
 */
// BAD(member-access)
class Member {
  foo() {
    // do somthing
  }
}

// GOOD: 始终显式设置成员的可见性, 这样可以提醒你慎重考虑属性的可见性, 避免将因为省略描
// 述符而将私有成员暴露出去
class Membero {
  public foo() {
    // do somthing
  }
}

// 详见 ../tslint.json
