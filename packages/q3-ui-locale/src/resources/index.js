import enDescriptions from './en/descriptions.json';
import enLabels from './en/labels.json';
import enTitles from './en/titles.json';
import enHelpers from './en/helpers.json';
import frDescriptions from './fr/descriptions.json';
import frLabels from './fr/labels.json';
import frTitles from './fr/titles.json';
import frHelpers from './fr/helpers.json';

export default {
  resources: {
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
  },
  lng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    skipOnVariables: false,
  },
  compatibilityJSON: 'v3',
};
