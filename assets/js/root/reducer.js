import {combineReducers} from 'redux';

import {localeReducer} from '../intl/redux';
import {userReducer} from '../user/redux';

export default combineReducers({
    userReducer: userReducer,
    intl: localeReducer,
});
