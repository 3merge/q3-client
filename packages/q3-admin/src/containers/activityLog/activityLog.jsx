import React from 'react';
import useRest from 'q3-ui-rest';
import { useTranslation } from 'react-i18next';
import {
  CircularProgress,
  Typography,
} from '@material-ui/core';
import Audit from 'q3-ui-audit';
import { Definitions } from '../state';

export const getAuthor = (v) => {
  if (!v.createdBy) return null;
  return `${v.createdBy.firstName} ${v.createdBy.lastName}`;
};

const History = () => {
  const { t } = useTranslation('descriptions');
  const { collectionName, id } = React.useContext(
    Definitions,
  );

  const {
    fetching,
    fetchingError,
    current = {},
    changes = [],
  } = useRest({
    url: `/audit?collectionName=${collectionName}&id=${id}`,
    key: 'changes',
    pluralized: 'changes',
    runOnInit: true,
  });

  if (fetching) return <CircularProgress />;

  return fetchingError ? (
    <Typography>
      {t('failedToLoadVersionHistory')}
    </Typography>
  ) : (
    <Audit current={current} data={changes} />
  );
};

History.propTypes = {};

export default History;
