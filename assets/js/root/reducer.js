import {combineReducers} from 'redux';

import {reducer as intlReducer} from '../intl/redux';

export default combineReducers({
    intl: intlReducer,
});
