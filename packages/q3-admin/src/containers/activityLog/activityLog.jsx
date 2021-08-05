import React from 'react';
import useRest from 'q3-ui-rest';
import { useTranslation } from 'react-i18next';
import {
  CircularProgress,
  Typography,
} from '@material-ui/core';
import { size } from 'lodash';
import Audit from 'q3-ui-audit';
import GraphicWithMessage from 'q3-ui-assets';
import { Definitions } from '../state';

const ActivityLog = () => {
  const { t } = useTranslation('descriptions');
  const { collectionName, id } = React.useContext(
    Definitions,
  );

  const { fetching, fetchingError, changes = [] } = useRest(
    {
      url: `/audit?collectionName=${collectionName}&id=${id}`,
      key: 'changes',
      pluralized: 'changes',
      runOnInit: true,
    },
  );

  if (fetching) return <CircularProgress />;

  if (fetchingError)
    return <Typography>{t('failedToLoadLogs')}</Typography>;

  if (!size(changes))
    return (
      <GraphicWithMessage
        title="trackChanges"
        icon="Puzzle"
      />
    );

  return <Audit data={changes} />;
};

export default ActivityLog;
