import React from 'react';
import { forEach, join, set, groupBy, map } from 'lodash';
import moment from 'moment';
import i18next from 'i18next';
import { browser } from 'q3-ui-helpers';

const useDebounce = (
  formater,
  cb = (x) => Promise.resolve(x),
) => {
  const accumulator = React.useRef([]);
  const timer = React.useRef();

  return (...args) => {
    if (timer.current) {
      accumulator.current.push(args);
    } else {
      timer.current = setTimeout(() => {
        const nextBatch = [args].concat([
          ...accumulator.current,
        ]);

        cb(formater(nextBatch));

        timer.current = clearTimeout(timer.current);
        accumulator.current = [];
      }, 200);
    }
  };
};

export default ({
  addLocaleHandler,
  loadLocaleHandler,
}) => {
  const [language, setLanguage] = React.useState();
  const ref = React.useRef();

  const create = useDebounce(
    (data) =>
      data.reduce((acc, current) => {
        const [lang, namespace, key, value] = current;

        forEach(lang, (l) => {
          set(acc, `${l}.${namespace}.${key}`, value);
        });

        return acc;
      }, {}),
    addLocaleHandler,
  );

  const read = useDebounce((data) =>
    Promise.all(
      Object.entries(
        groupBy(
          data.map(([l, n, f]) => ({
            l,
            n,
            f,
          })),
          'l',
        ),
      ).map(([lng, bundles = []]) =>
        loadLocaleHandler({
          lng,
          ns: join(map(bundles, 'n'), ','),
        })
          .then((resp) =>
            map(bundles, ({ n, f }) => {
              f(null, resp[n] || {});
            }),
          )
          .catch((e) =>
            map(bundles, 'f').forEach((fn) => {
              fn(e, {});
            }),
          ),
      ),
    ),
  );

  React.useEffect(() => {
    const i18n = i18next.createInstance({
      initImmediate: false,
      fallbackLng: false,
      partialBundledLanguages: true,
      load: 'currentOnly',
      nonExplicitSupportedLngs: true,
      ns: [
        'descriptions',
        'helpers',
        'labels',
        'messages',
        'titles',
      ],
      saveMissing: true,
      supportedLngs: ['en', 'fr'],
    });

    i18n
      .use({
        init() {},
        cacheUserLanguage(lng) {
          browser.proxyLocalStorageApi(
            'setItem',
            'q3-lang',
            lng,
          );

          moment.locale(lng);
        },
        detect() {
          return (
            browser.proxyLocalStorageApi(
              'getItem',
              'q3-lang',
            ) || 'en'
          );
        },
        type: 'languageDetector',
      })
      .use({
        create,
        init() {},
        read,
        type: 'backend',
      });

    i18n.init({}, () => {
      ref.current = i18n;
      setLanguage(i18n.language);
    });
  }, []);

  React.useEffect(() => {
    if (language) {
      moment.locale(language);
      browser.proxyLocalStorageApi(
        'setItem',
        'q3-lang',
        language,
      );
    }
  }, [language]);

  return language
    ? {
        language,
        translate(a, b, c) {
          const k = [a, b].join(':');
          return ref.current.exists(k)
            ? ref.current.t(k, c)
            : b;
        },

        changeLanguage(newLang) {
          ref.current.changeLanguage(newLang, () => {
            setLanguage(newLang);
          });
        },
      }
    : null;
};
