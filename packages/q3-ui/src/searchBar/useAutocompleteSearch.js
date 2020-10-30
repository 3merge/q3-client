import React from 'react';
import { useTranslation } from 'react-i18next';
import { useValue } from 'useful-state';
import useStyles from './useStyles';

export default (initialValue) => {
  const { t } = useTranslation('labels');
  const cls = useStyles();

  const {
    value,
    onChange,
    onClear,
    setValue,
    ref,
  } = useValue(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    onChange,
    setValue,
    onClear,
    name: 'search',
    type: 'text',
    innerRef: ref,
    id: 'app-searchbar',
    fullWidth: true,
    autoComplete: 'off',
    placeholder: t('searchPlaceholder'),
    inputProps: {
      'aria-label': t('labels:search'),
      className: cls.input,
    },
  };
};
