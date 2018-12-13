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
import MyPageLayout from './components/containers/MyPage/MyPageLayout'
import ToastContainer from './components/containers/ToastContainer'

import configureStore from './root/store'

import Onboarding from './components/Onboarding'
import Landing from './components/Landing'
import AllServices from './services/AllServices'
import NotLoggedIn from './components/NotLoggedIn'

import Profile from './components/Tab/Profile/Profile'
import Interests from './components/Tab/Interest/Interest'
import Services from './components/Tab/Service/Service'
import History from './components/Tab/History/History'

const history = createBrowserHistory()

const intlLocaleData = getIntlLocaleData()
addLocaleData(intlLocaleData)

const store = configureStore()

function MyPageRoute({ match, location }) {
  return (
    <MyPageLayout location={location}>
      <Switch>
        <Route exact path={`${match.url}/`} component={Profile} />
        <Route path={`${match.url}/profile`} component={Profile} />
        <Route path={`${match.url}/interests`} component={Interests} />
        <Route path={`${match.url}/services`} component={Services} />
        <Route path={`${match.url}/history`} component={History} />
      </Switch>
    </MyPageLayout>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedIntlProvider>
      <App history={history}>
        <Router history={history}>
          <MainLayout>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/**/my-data/" component={MyPageRoute} />
              <Route exact path="/**/welcome/" component={Onboarding} />
              <Route exact path="/**/services/" component={AllServices} />
              <Route path="/**/app/please-log-in/" component={NotLoggedIn} />
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
