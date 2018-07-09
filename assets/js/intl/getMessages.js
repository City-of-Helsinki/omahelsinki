import * as fiMessages from './translations/fi.json';
import * as enMessages from './translations/en.json'

const translations = {
    fi: fiMessages,
    en: enMessages,
}

export function getMessages(locale) {
    const messages = translations[locale];
    if (!messages)
        return {};
    if (Object.keys(messages).length == 1 && 'default' in messages)
        return messages.default;
    return messages;
}
