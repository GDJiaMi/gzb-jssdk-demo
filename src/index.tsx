/**
 * main
 */
import 'global-style'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { ThemeProvider } from 'utils/styled-components'
import App from 'containers/App'
import * as theme from './theme'

const rootEl = document.getElementById('root')
const render = (Component: React.ComponentClass) =>
  ReactDOM.render(
    <AppContainer>
      <ThemeProvider theme={theme}>
        <Router>
          <Component />
        </Router>
      </ThemeProvider>
    </AppContainer>,
    rootEl,
  )

render(App)

if (module.hot) {
  module.hot.accept('containers/App', () => {
    render(App)
  })
  module.hot.accept('./theme', () => {
    render(App)
  })
}
