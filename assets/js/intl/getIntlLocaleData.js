import en from 'react-intl/locale-data/en';
import fi from 'react-intl/locale-data/fi';
import sv from 'react-intl/locale-data/sv';

export default function getIntlLocaleData() {
    return [...en, ...fi, ...sv];
}
