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
import UserOnboarding from './components/Onboarding'
import AllServices from './services/AllServices'

import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(far, fas)

const intlLocaleData = getIntlLocaleData()
addLocaleData(intlLocaleData)

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedIntlProvider>
      <App>
        <BrowserRouter>
          <MainLayout>
            <Switch>
              <Route exact path="/mydata/" component={MainPage} />
              <Route exact path="/welcome/" component={UserOnboarding} />
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
