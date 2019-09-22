import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import moment from 'moment';
import * as yup from 'yup';
import enDescriptions from '../static/en.descriptions';
import enLabels from '../static/en.labels';
import enTitles from '../static/en.titles';
import enHelpers from '../static/en.helpers';
import enYup from '../static/en.yup';

const lng = 'en';

const setDependentLanguages = () => {
  const { language } = i18n;
  moment.locale(language);

  if (language === 'en') {
    yup.setLocale(enYup);
  }
};

const resources = {
  en: {
    descriptions: enDescriptions,
    labels: enLabels,
    titles: enTitles,
    helpers: enHelpers,
  },
};

i18n.use(initReactI18next).init(
  {
    resources,
    lng,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  },
  setDependentLanguages,
);

i18n.on('languageChanged', setDependentLanguages);

export default i18n;
export { yup };
