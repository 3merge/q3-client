import { useTranslation } from 'react-i18next';
import { useValue } from 'useful-state';

export default (initialValue) => {
  const { t } = useTranslation('labels');

  const {
    value,
    onChange,
    onClear,
    setValue,
    ref,
  } = useValue(initialValue);

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
    },
  };
};
