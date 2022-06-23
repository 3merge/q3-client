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
    <Box className={cls.root}>
      <Typography
        component="h1"
        variant="h2"
        style={{
          margin: 0,
          marginRight: '1rem',
        }}
      >
        {!s ? t(collectionName) : t(s)}
      </Typography>
    </Box>
  );
};

export default CollectionName;
