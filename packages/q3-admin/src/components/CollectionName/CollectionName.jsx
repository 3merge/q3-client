import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'q3-ui-locale';
import { useSegmentsAppliedByCollection } from 'q3-ui-navbar';
import { Definitions } from '../../containers/state';
import useStyle from './styles';

const CollectionName = () => {
  const { collectionName } = React.useContext(Definitions);
  const s =
    useSegmentsAppliedByCollection(collectionName)?.label;
  const { t } = useTranslation('titles');
  const cls = useStyle();

  return (
    <Typography
      className={cls.h1}
      component="h1"
      variant="h3"
    >
      {!s ? t(collectionName) : t(s)}
    </Typography>
  );
};

export default CollectionName;
