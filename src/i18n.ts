import 'intl-pluralrules'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { DateTime } from 'luxon';

import fr from '@/lang/fr.json';
import en from '@/lang/en.json';

await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'fr',
        interpolation: {
            escapeValue: false
        },
        resources: {
            fr,
            en
        }
    });

i18n?.services?.formatter?.add('DATE_HUGE', (value, lng) => {
    return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATE_HUGE)
});

export default i18n;
