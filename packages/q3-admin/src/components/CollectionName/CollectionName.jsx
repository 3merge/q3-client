import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import { Definitions } from '../../containers/state';
import useStyle from './styles';
import useSegmentsActiveLabel from '../../hooks/useSegmentsActiveLabel';

const CollectionName = () => {
  const { collectionName } = React.useContext(Definitions);
  const s = useSegmentsActiveLabel();
  const { t } = useTranslation('titles');
  const cls = useStyle();

  return (
    <Box className={cls.root} py={1}>
      <Typography component="h1" variant="h5">
        {t(collectionName)}
        <small className={cls.seg}>{t(s)}</small>
      </Typography>
    </Box>
  );
};

export default CollectionName;
