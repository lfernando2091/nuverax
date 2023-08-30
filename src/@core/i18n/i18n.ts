import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import homeEnNameSpace from './locales/en/home/home.json';
import homeEsNameSpace from './locales/es/home/home.json';
import spaceEnNameSpace from './locales/en/space/space.json';
import spaceEsNameSpace from './locales/es/space/space.json';
import spaceDocEnNameSpace from './locales/en/space/document.json';
import spaceDocEsNameSpace from './locales/es/space/document.json';
import editorEsNameSpace from './locales/es/editor/editor.json';
import editorEnNameSpace from './locales/en/editor/editor.json';
import signEsNameSpace from './locales/es/sign/sign.json';
import signEnNameSpace from './locales/en/sign/sign.json';
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
            editorNS: editorEnNameSpace,
            signNS: signEnNameSpace,
            aiAnalystNS: aiAnalystEnNameSpace,
            pdfViewerNS: pdfViewerEnNameSpace
        },
        es: {
            homeNS: homeEsNameSpace,
            spaceNS: spaceEsNameSpace,
            spaceDocNS: spaceDocEsNameSpace,
            editorNS: editorEsNameSpace,
            signNS: signEsNameSpace,
            aiAnalystNS: aiAnalystEsNameSpace,
            pdfViewerNS: pdfViewerEsNameSpace
        },
    },
}).then(r => { });

export default i18next;