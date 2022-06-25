import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'q3-ui-locale';
import { Definitions } from '../../containers/state';
import useSegmentsActiveLabel from '../../hooks/useSegmentsActiveLabel';
import useStyle from './styles';

const CollectionName = () => {
  const { collectionName } = React.useContext(Definitions);
  const s = useSegmentsActiveLabel();
  const { t } = useTranslation('titles');
  const cls = useStyle();

  return (
    <Typography
      className={cls.h1}
      component="h1"
      variant="h2"
    >
      {!s ? t(collectionName) : t(s)}
    </Typography>
  );
};

export default CollectionName;
