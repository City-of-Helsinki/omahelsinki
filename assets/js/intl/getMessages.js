import * as fiMessages from './translations/fi.json';
import * as enMessages from './translations/en.json'

const translations = {
    fi: fiMessages,
    en: enMessages,
}

export function getMessages(locale) {
    return translations[locale] || {};
}
