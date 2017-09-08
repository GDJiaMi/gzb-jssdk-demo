/**
 * main
 */
import 'global-style'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { AppContainer } from 'react-hot-loader'
import { ThemeProvider } from 'utils/styled-components'
import LanguageProvider from 'utils/LanguageProvider'
import App from 'containers/App'
import * as theme from './theme'
import history from './browserHistory'
import './store'
import { translationMessages } from './i18n'

const rootEl = document.getElementById('root')
const render = (messages: object) => {
  const Componenent = App as React.ComponentClass
  ReactDOM.render(
    <AppContainer>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <MuiThemeProvider>
            <LanguageProvider messages={messages}>
              <Componenent />
            </LanguageProvider>
          </MuiThemeProvider>
        </ThemeProvider>
      </Router>
    </AppContainer>,
    rootEl,
  )
}

if (module.hot) {
  module.hot.accept('containers/App', () => {
    render(translationMessages)
  })
  module.hot.accept('./theme', () => {
    render(translationMessages)
  })
  module.hot.accept('./i18n', () => {
    render(translationMessages)
  })
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'))
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en'),
        import('intl/locale-data/jsonp/zh'),
      ]),
    )
    .then(() => render(translationMessages))
    .catch(err => {
      throw err
    })
} else {
  render(translationMessages)
}
