/**
 * 初始化i18n
 */
import { addLocaleData } from 'react-intl'
import * as enLocaleData from 'react-intl/locale-data/en'
import * as zhLocaleData from 'react-intl/locale-data/zh'
import { DEFAULT_LOCALE } from 'containers/App/constants'

addLocaleData(enLocaleData)
addLocaleData(zhLocaleData)

const enTranslation = require('./translations/en.json')
const zhTranslation = require('./translations/zh.json')

export const translations = {
  en: enTranslation,
  zh: zhTranslation,
}

export const appLocales = ['zh', 'en']

export function formatTranslationMessages(
  locale: keyof typeof translations,
  messages: object,
) {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, translations[DEFAULT_LOCALE])
      : {}
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage: string =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key]
    // tslint:disable-next-line
    return Object.assign(formattedMessages, { [key]: formattedMessage })
  }, {})
}

export const translationMessages = {
  zh: formatTranslationMessages('zh', zhTranslation),
  en: formatTranslationMessages('en', enTranslation),
}
