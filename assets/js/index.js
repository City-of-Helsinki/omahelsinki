import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {addLocaleData} from 'react-intl';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import ConnectedIntlProvider from './intl/ConnectedIntlProvider';
import getIntlLocaleData from './intl/getIntlLocaleData';
import App from './components/App/App';

import configureStore from './root/store';

import MainPage from './components/Main';
import UserOnboarding from './components/Onboarding';
import AllServices from './services/AllServices';


const intlLocaleData = getIntlLocaleData();
addLocaleData(intlLocaleData);

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedIntlProvider>
            <App>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/mydata/' component={MainPage} />
                        <Route exact path='/welcome/' component={UserOnboarding} />
                        <Route exact path='/services/' component={AllServices} />
                    </Switch>
                </BrowserRouter>
            </App>
        </ConnectedIntlProvider>
    </Provider>,
    document.getElementById('react-app')
);
