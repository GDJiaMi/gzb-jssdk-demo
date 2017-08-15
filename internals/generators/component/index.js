/**
 * Component Generator
 */
'use strict'

const path = require('path')
const { componentExists } = require('../utils/componentExists.js')
const pascalCase = require('../utils/pascalCase')

module.exports = {
  description: '添加一个组件',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: '选择组件类型: ',
      default: 'stateless',
      choices: [
        {
          name: '无状态组件',
          value: 'stateless',
        },
        {
          name: 'Styled Components 组件',
          value: 'styled',
        },
        {
          name: 'ES6 Class组件',
          value: 'class',
        },
      ],
    },
    {
      type: 'input',
      name: 'name',
      message: '请输入组件名(PascalCase): ',
      validate: value => {
        if (/.+/.test(value)) {
          value = pascalCase(value)
          return componentExists(value) ? `这个组件已存在(${value})` : true
        }
        return '必须输入组件名'
      },
    },
    {
      type: 'input',
      name: 'description',
      message: data => `请输入组件描述(默认为: ${pascalCase(data.name)}): `,
      default: data => data.name,
      validate: value => {
        if (/.+/.test(value)) {
          return true
        }
        return '必须输入组件描述'
      },
    },
    {
      type: 'confirm',
      name: 'i18n',
      default: true,
      message: '是否支持i18n?: ',
    },
    {
      type: 'recursive',
      message: '继续添加props?: ',
      name: 'props',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'Props 命名: ',
          validate: (() => {
            let props = []
            return value => {
              if (/.+/.test(value)) {
                if (props.find(item => item === value)) {
                  return 'props 已存在'
                }
                props.push(value)
                return true
              }
              return '必须输入props名'
            }
          })(),
        },
        {
          type: 'input',
          name: 'type',
          message: 'Props 类型: ',
          default: 'any',
          validate: value => {
            if (/.+/.test(value)) {
              return true
            }
            return '必须输入props类型'
          },
        },
        {
          type: 'input',
          name: 'default',
          message: '默认值',
          default: '',
        },
      ],
    },
  ],
  actions: data => {
    let componentTemplate
    const outputPath = path.resolve(
      process.cwd(),
      `src/components/${pascalCase(data.name)}/`
    )
    switch (data.type) {
      case 'stateless':
        componentTemplate = path.resolve(__dirname, './stateless.js.hbs')
        break
      case 'styled':
        componentTemplate = path.resolve(__dirname, './styled.tsx.hbs')
        break
      case 'class':
        componentTemplate = path.resolve(__dirname, './es6.tsx.hbs')
        break
    }

    const actions = [
      {
        type: 'add',
        path: path.join(outputPath, 'index.tsx'),
        templateFile: componentTemplate,
        abortOnFail: true,
      },
    ]

    if (data.i18n) {
      actions.push({
        type: 'add',
        path: path.join(outputPath, 'messages.ts'),
        templateFile: path.resolve(__dirname, './messages.ts.hbs'),
        abortOnFail: true,
      })
    }

    data.defaultProps = data.props.filter(item => item.default !== '')

    return actions
  },
}
