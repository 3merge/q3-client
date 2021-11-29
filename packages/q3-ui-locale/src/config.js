import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './resources';
import setDeps from './deps';

const i18n = i18next.use(initReactI18next);
i18n.init(resources, setDeps);
i18n.on('languageChanged', setDeps);

export default i18n;
