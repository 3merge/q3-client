import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import moment from 'moment';
import * as yup from 'yup';

// this is just lazy ...
import enDescriptions from '../locale/en/descriptions.json';
import enLabels from '../locale/en/labels.json';
import enTitles from '../locale/en/titles.json';
import enHelpers from '../locale/en/helpers.json';
import enYup from '../locale/en/yup.json';
import frDescriptions from '../locale/fr/descriptions.json';
import frLabels from '../locale/fr/labels.json';
import frTitles from '../locale/fr/titles.json';
import frHelpers from '../locale/fr/helpers.json';
import frYup from '../locale/fr/yup.json';

const lng = 'en';

const setDependentLanguages = () => {
  const { language } = i18n;
  moment.locale(language);

  if (language === 'en') {
    yup.setLocale(enYup);
  } else if (language === 'fr') {
    yup.setLocale(frYup);
  }
};

const resources = {
  en: {
    descriptions: enDescriptions,
    labels: enLabels,
    titles: enTitles,
    helpers: enHelpers,
  },
  fr: {
    descriptions: frDescriptions,
    labels: frLabels,
    titles: frTitles,
    helpers: frHelpers,
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
