import React from 'react';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const PopoverSave = (props) => {
  const { t } = useTranslation('labels');

  return (
    <Button type="button" {...props}>
      {t('apply')}
    </Button>
  );
};

export default PopoverSave;
