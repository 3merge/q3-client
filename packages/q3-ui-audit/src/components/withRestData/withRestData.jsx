import React from 'react';
import useRest from 'q3-ui-rest';
import { useTranslation } from 'react-i18next';
import {
  CircularProgress,
  Typography,
  Button,
} from '@material-ui/core';
import { size } from 'lodash';
import Audit from 'q3-ui-audit';
import GraphicWithMessage from 'q3-ui-assets';

// 150 each time

const ActivityLog = (Component) => (collection, id) => {
  const { t } = useTranslation('descriptions');

  const { fetching, fetchingError, changes = [] } = useRest(
    {
      url: `/audit?collectionName=${collection}&id=${id}`,
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

  return (
    <>
      <Component data={changes} />
      <Button type="button">Check for more history</Button>
    </>
  );
};

export default ActivityLog;
