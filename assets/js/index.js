import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { addLocaleData } from 'react-intl'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import ConnectedIntlProvider from './intl/ConnectedIntlProvider'
import getIntlLocaleData from './intl/getIntlLocaleData'
import App from './components/App/App'

import MainLayout from './components/containers/MainLayout'
import ToastContainer from './components/containers/ToastContainer'

import configureStore from './root/store'

import MainPage from './components/Main'
import Onboarding from './components/Onboarding'
import Landing from './components/Landing'
import AllServices from './services/AllServices'
import NotLoggedIn from './components/NotLoggedIn'
import NotFound from './components/NotFound'

const history = createBrowserHistory()

const intlLocaleData = getIntlLocaleData()
addLocaleData(intlLocaleData)

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedIntlProvider>
      <App>
        <Router history={history}>
          <MainLayout>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/mydata/" component={MainPage} />
              <Route exact path="/welcome/" component={Onboarding} />
              <Route exact path="/services/" component={AllServices} />
              <Route exact path="/app/please-log-in/" component={NotLoggedIn} />
              <Route component={NotFound} />
            </Switch>
            {ReactDOM.createPortal(
              <ToastContainer />,
              document.getElementById('toast-root')
            )}
          </MainLayout>
        </Router>
      </App>
    </ConnectedIntlProvider>
  </Provider>,
  document.getElementById('react-app')
)
