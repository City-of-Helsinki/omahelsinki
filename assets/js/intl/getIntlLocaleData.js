import en from 'react-intl/locale-data/en';
import fi from 'react-intl/locale-data/fi';

export default function getIntlLocaleData() {
    return [...en, ...fi];
}
