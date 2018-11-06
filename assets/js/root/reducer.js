import {combineReducers} from 'redux';

import {localeReducer} from '../intl/redux';
import {userReducer} from '../user/redux';
import {servicesReducer} from '../services/redux';


export default combineReducers({
    userReducer: userReducer,
    intl: localeReducer,
    services: servicesReducer,
});
