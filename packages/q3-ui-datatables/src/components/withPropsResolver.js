import React from 'react';
import { useTranslation } from 'react-i18next';
import { string } from 'q3-ui-helpers';

export default (Component, options) => (label) => {
  const { t } = useTranslation('labels');
  let formatted = label;

  if (options.toTruthy)
    formatted = string.toTruthy(label, t);
  if (options.toDate) formatted = string.toDate(label);
  if (options.toPrice) formatted = string.toPrice(label);
  if (options.trans) formatted = t(label);

  return label
    ? React.createElement(Component, {
        ...options.resolve(label),
        status: formatted,
        label: formatted,
      })
    : null;
};
