import i18n from 'i18next';
import moment from 'moment';
import * as yup from 'yup';
import enYup from './resources/en/yup.json';
import frYup from './resources/fr/yup.json';

export default () => {
  const { language } = i18n;
  moment.locale(language);

  if (language === 'en') {
    yup.setLocale(enYup);
  } else if (language === 'fr') {
    yup.setLocale(frYup);
  }
};
