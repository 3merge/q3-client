import React from 'react';
import IconButton from 'q3-ui/lib/iconButton';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import { useTranslation } from 'react-i18next';
import { useBack } from '../../hooks';

const Back = () => {
  const { t } = useTranslation('labels');

  return (
    <IconButton
      label={t('previous')}
      icon={KeyboardBackspace}
      buttonProps={{
        onClick: useBack(),
      }}
    />
  );
};

export default Back;
