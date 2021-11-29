import React from 'react';
import { Box, Button } from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';

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
