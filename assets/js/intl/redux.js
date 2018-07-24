import {createAction, handleActions} from 'redux-actions';
import {getMessages} from './getMessages';

export const changeLocale = createAction('intl/changeLocale');

const changeLocaleHandler = (state, {payload}) => {
    return {
        ...state,
        locale: payload,
        messages: getMessages(payload),
    };
};

const defaultState = {
    locale: 'en',
    messages: getMessages('en'),
};


export const localeReducer = handleActions({
    changeLocale, changeLocaleHandler,
}, defaultState)
