import React from 'react';
import IconButton from 'q3-ui/lib/iconButton';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import { useTranslation } from 'q3-ui-locale';
import { useBack } from '../../hooks';

const Back = () => {
  const { t } = useTranslation('labels');

  return (
    <IconButton
      label={t('previous')}
      icon={KeyboardBackspace}
      buttonProps={{
        onClick: useBack(),
        role: 'link',
      }}
    />
  );
};

export default Back;
