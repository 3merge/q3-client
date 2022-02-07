import React from 'react';
import i18next from 'i18next';

export default (i18nProps = {}) => {
  const [i18n, setI18n] = React.useState();
  const { lng, supportedLngs, resources } = i18nProps;

  // UPDATE

  React.useEffect(() => {
    const i18nInstance = i18next.createInstance({
      ...i18nProps,
      nonExplicitSupportedLngs: true,
      ns: [
        'descriptions',
        'helpers',
        'labels',
        'messages',
        'titles',
      ],
      // useMissingKey
      saveMissing: true,
      resources:
        lng in resources
          ? resources
          : {
              [lng]: resources,
            },
    });

    i18nInstance.init(() => {
      setI18n(i18nInstance);
    });
  }, [lng]);

  return {
    lng,
    resources,
    supportedLngs,
    translate(a, b, c) {
      const k = [a, b].join(':');

      if (!i18n) return b;
      return i18n.exists(k) ? i18n.t(k, c) : b;
    },
  };
};
