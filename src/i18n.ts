import 'intl-pluralrules'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { DateTime } from 'luxon';
import Backend from 'i18next-http-backend';

import fr from '@/locales/fr/translation.json';
import en from '@/locales/en/translation.json';

await i18n
    .use(Backend)
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
