import React from 'react';
import IconButton from 'q3-ui/lib/iconButton';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import { useTranslation } from 'react-i18next';
import { useBack } from 'q3-hooked';

const Back = () => {
  const { t } = useTranslation('labels');
  const { renderer } = useBack();

  return (
    <IconButton
      label={t('previous')}
      icon={KeyboardBackspace}
      buttonProps={{
        component: renderer,
      }}
    />
  );
};

export default Back;
