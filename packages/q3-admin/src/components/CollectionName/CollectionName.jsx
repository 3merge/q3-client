import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'q3-ui-locale';
import { Definitions } from '../../containers/state';
import useSegmentsActiveLabel from '../../hooks/useSegmentsActiveLabel';

const CollectionName = () => {
  const { collectionName } = React.useContext(Definitions);
  const s = useSegmentsActiveLabel();
  const { t } = useTranslation('titles');

  return (
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
  );
};

export default CollectionName;
