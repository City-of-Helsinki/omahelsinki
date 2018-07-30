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
const defaultLanguage = window.LANGUAGE_CODE || 'en'

const defaultState = {
    locale: defaultLanguage,
    messages: getMessages(defaultLanguage),
};


export const localeReducer = handleActions({
    changeLocale, changeLocaleHandler,
}, defaultState)
