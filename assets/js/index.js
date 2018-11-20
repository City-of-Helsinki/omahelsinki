import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { addLocaleData } from 'react-intl'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

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

const intlLocaleData = getIntlLocaleData()
addLocaleData(intlLocaleData)
//console.log(process.env.NODE_ENV)
const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedIntlProvider>
      <App>
        <BrowserRouter>
          <MainLayout>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/mydata/" component={MainPage} />
              <Route exact path="/welcome/" component={Onboarding} />
              <Route exact path="/services/" component={AllServices} />
            </Switch>
            {ReactDOM.createPortal(
              <ToastContainer />,
              document.getElementById('toast-root')
            )}
          </MainLayout>
        </BrowserRouter>
      </App>
    </ConnectedIntlProvider>
  </Provider>,
  document.getElementById('react-app')
)
