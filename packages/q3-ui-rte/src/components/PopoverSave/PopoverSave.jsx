import React from 'react';
import { Box, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const PopoverSave = (props) => {
  const { t } = useTranslation('labels');

  return (
    <Box align="right">
      <Button type="button" {...props}>
        {t('apply')}
      </Button>
    </Box>
  );
};

export default PopoverSave;
