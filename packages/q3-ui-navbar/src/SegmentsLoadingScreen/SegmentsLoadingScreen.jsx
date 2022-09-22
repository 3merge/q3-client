import React from 'react';
import { useTranslation } from 'q3-ui-locale';
import { Typography } from '@material-ui/core';

const SegmentsLoadingScreen = () => (
  <Typography>
    {useTranslation('descriptions')
      .t('loadingSegments')
      .concat('...')}
  </Typography>
);

export default SegmentsLoadingScreen;
