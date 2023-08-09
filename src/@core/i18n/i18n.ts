import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import homeEnNameSpace from './locales/en/home/home.json';
import homeEsNameSpace from './locales/es/home/home.json';
import spaceEnNameSpace from './locales/en/space/space.json';
import spaceEsNameSpace from './locales/es/space/space.json';

export const defaultNS = 'homeNS';

i18next.use(initReactI18next).init({
    debug: true,
    fallbackLng: 'es',
    defaultNS,
    resources: {
        en: {
            homeNS: homeEnNameSpace,
            spaceNS: spaceEnNameSpace
        },
        es: {
            homeNS: homeEsNameSpace,
            spaceNS: spaceEsNameSpace
        },
    },
}).then(r => { });

export default i18next;