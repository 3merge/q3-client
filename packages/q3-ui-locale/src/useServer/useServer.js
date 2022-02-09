import React from 'react';
import i18next from 'i18next';
import { set } from 'lodash';
import { browser, object } from 'q3-ui-helpers';

export default (i18nProps = {}) => {
  const [i18n, setI18n] = React.useState();
  const { lng, supportedLngs, resources } = i18nProps;
  const ref = React.useRef({
    current: {},
  });

  React.useEffect(() => {
    const i18nInstance = i18next.createInstance({
      ...i18nProps,
      ns: [
        'descriptions',
        'helpers',
        'labels',
        'messages',
        'titles',
      ],
      resources: {
        // will only ever contain active language
        [lng]: resources,
      },
    });

    i18nInstance.init(() => {
      setI18n(i18nInstance);
    });
  }, [lng]);

  React.useEffect(() => {
    // always save it
    if (browser.isBrowserReady())
      window.onbeforeunload = function () {
        browser.proxySessionStorageApi(
          'setItem',
          'missingKeys',
          object.toJSON(ref.current),
        );
      };
  }, []);

  return {
    lng,
    resources,
    supportedLngs,
    translate(a, b, c) {
      const k = [a, b].join(':');

      if (!i18n) return b;
      if (i18n.exists(k)) return i18n.t(k, c);
      set(ref, `current.${a}.${b}`, b);
      return b;
    },
  };
};
