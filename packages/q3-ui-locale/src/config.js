import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

const i18n = i18next
  .use(
    resourcesToBackend((language, namespace, callback) => {
      console.log(language, namespace);
      callback({});
    }),
  )
  .use(initReactI18next);

i18n.init({
  fallbackLng: false,
  partialBundledLanguages: true,
  load: 'currentOnly',
  ns: [
    'descriptions',
    'helpers',
    'labels',
    'messages',
    'titles',
  ],
  react: {
    wait: false,
    useSuspense: false,
    bindI18n: 'languageChanged',
    bindStore: 'added',
  },
  saveMissing: true,
  supportedLngs: ['en', 'fr'],
});

export default i18n;
