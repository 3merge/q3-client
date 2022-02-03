import React from 'react';
import { forEach, last, join, set, first } from 'lodash';
import moment from 'moment';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const useDebounce = (callback, formater) => {
  const accumulator = React.useRef([]);
  const timer = React.useRef();

  return (...args) => {
    if (timer.current) {
      accumulator.current.push(args);
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback(formater([...accumulator.current]));
      clearTimeout(timer.current);
      accumulator.current = [];
    }, 500);
  };
};

export default ({
  addLocaleHandler,
  loadLocaleHandler,
}) => {
  const create = useDebounce(addLocaleHandler, (data) =>
    data.reduce((acc, current) => {
      const [lang, namespace, key, value] = current;

      forEach(lang, (l) => {
        set(acc, `${l}.${namespace}.${key}`, value);
      });

      return acc;
    }, {}),
  );

  const read = useDebounce(
    (x) => Promise.resolve(x),
    (data) => {
      const language = first(first(data));
      return loadLocaleHandler({
        lng: language,
        ns: join(
          data.map((item) => item[1]),
          ',',
        ),
      })
        .then((resp) => {
          data.forEach(([, ns, fn]) => {
            fn(null, resp[ns] || {});
          });
        })
        .catch((e) => {
          data.map(last).forEach((fn) => {
            fn(e, {});
          });
        });
    },
  );

  const i18n = i18next
    .use({
      type: 'backend',
      init() {},
      read,
      create,
    })
    .use(initReactI18next);

  React.useEffect(() => {
    i18n.on('languageChanged', (lang) => {
      moment.locale(lang);
    });

    return () => {
      i18n.off('languageChanged');
    };
  }, []);

  React.useEffect(() => {
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
        bindI18n: 'languageChanged loaded initialized',
        bindStore: 'added',
      },
      saveMissing: true,
      supportedLngs: ['en', 'fr'],
    });
  }, []);

  return i18n;
};
