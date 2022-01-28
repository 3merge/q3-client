import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import { Definitions } from '../../containers/state';
import useStyle from './styles';

const CollectionName = () => {
  const { collectionName } = React.useContext(Definitions);
  const { t } = useTranslation('titles');
  const cls = useStyle();

  return (
    <Box py={1}>
      <Typography
        className={cls.root}
        component="h1"
        variant="h5"
      >
        {t(collectionName)}
      </Typography>
    </Box>
  );
};

export default CollectionName;
