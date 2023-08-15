import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import homeEnNameSpace from './locales/en/home/home.json';
import homeEsNameSpace from './locales/es/home/home.json';
import spaceEnNameSpace from './locales/en/space/space.json';
import spaceEsNameSpace from './locales/es/space/space.json';
import spaceDocEnNameSpace from './locales/en/space/document.json';
import spaceDocEsNameSpace from './locales/es/space/document.json';
import {aiAnalystEnNameSpace, aiAnalystEsNameSpace} from "../../components/ai-analyst";
import {pdfViewerEnNameSpace, pdfViewerEsNameSpace} from "../../components/pdf-viewer";

export const defaultNS = 'homeNS';

i18next.use(initReactI18next).init({
    debug: false,
    fallbackLng: 'es',
    defaultNS,
    resources: {
        en: {
            homeNS: homeEnNameSpace,
            spaceNS: spaceEnNameSpace,
            spaceDocNS: spaceDocEnNameSpace,
            aiAnalystNS: aiAnalystEnNameSpace,
            pdfViewerNS: pdfViewerEnNameSpace
        },
        es: {
            homeNS: homeEsNameSpace,
            spaceNS: spaceEsNameSpace,
            spaceDocNS: spaceDocEsNameSpace,
            aiAnalystNS: aiAnalystEsNameSpace,
            pdfViewerNS: pdfViewerEsNameSpace
        },
    },
}).then(r => { });

export default i18next;