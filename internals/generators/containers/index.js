/**
 * Container Generator
 */
'use strict'

const path = require('path')
const { containerExists } = require('../utils/componentExists')
const pascalCase = require('../utils/pascalCase')
const resolveComponents = require('../utils/resolveComponents')
const resolveStores = require('../utils/resolveStores')
const fuzzy = require('fuzzy')
const autocompleteTypes = [
  'any',
  'number',
  'boolean',
  'string',
  'null',
  'void',
  'undefined',
]

module.exports = {
  description: '添加一个容器',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '请输入容器名(PascalCase): ',
      validate: value => {
        if (/.+/.test(value)) {
          value = pascalCase(value)
          return containerExists(value) ? `这个容器已存在(${value})` : true
        }
        return '必须输入容器名'
      },
    },
    {
      type: 'input',
      name: 'description',
      message: '请输入容器描述: ',
      validate: value => {
        if (/.+/.test(value)) {
          return true
        }
        return '必须输入容器描述'
      },
    },
    {
      type: 'confirm',
      name: 'i18n',
      default: true,
      message: '是否支持i18n?: ',
    },
    {
      type: 'confirm',
      name: 'hasRoute',
      default: true,
      message: '是否包含Route?: ',
    },
    {
      type: 'checkbox',
      name: 'stores',
      message: '选择注入的Store: ',
      choices: resolveStores,
    },
    {
      type: 'checkbox',
      name: 'components',
      message: '选用Component: ',
      choices: resolveComponents,
    },
    {
      type: 'input',
      name: 'newStore',
      message: '输入需要新建的Store, 命名格式为`FooStore`(以Store为后缀), 多个Store以空格分割: ',
      validate: value => {
        if (value) {
          if (!value.endsWith('Store')) {
            return `Store 必须以'Store'为后缀, 但是你输入的是${value}`
          }
        }
        return true
      },
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
          type: 'autocomplete',
          name: 'type',
          message: 'Props 类型: ',
          default: 'any',
          suggestOnly: true,
          source: (answers, input) => {
            input = input || ''
            return new Promise(resolve => {
              const fuzzyRes = fuzzy.filter(input, autocompleteTypes)
              resolve(fuzzyRes.map(el => el.original))
            })
          },
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
        },
      ],
    },
  ],
  actions: data => {
    data.defaultProps = data.props.filter(item => item.default !== '')
    data.injectStores = data.stores.map(i => i.name).concat(data.newStore)
    data.injectStoreAndWithRouter = data.injectStores.length && data.hasRoute

    const outputPath = path.resolve(
      process.cwd(),
      `src/containers/${pascalCase(data.name)}/`
    )

    const actions = [
      {
        type: 'add',
        path: path.join(outputPath, 'index.tsx'),
        templateFile: path.resolve(__dirname, './index.tsx.hbs'),
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

    if (data.newStore) {
      actions.push({
        type: 'add',
        path: path.join(outputPath, 'stores/index.ts'),
        templateFile: path.resolve(__dirname, './storeindex.ts.hbs'),
        abortOnFail: true,
      }, {
        type: 'add',
        path: path.join(outputPath, `stores/${pascalCase(data.newStore)}.ts`),
        templateFile: path.resolve(__dirname, './store.ts.hbs'),
        abortOnFail: true,
      })
    }

    return actions
  },
}
