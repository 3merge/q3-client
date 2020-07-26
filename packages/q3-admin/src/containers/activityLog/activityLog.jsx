import React from 'react';
import useRest from 'q3-ui-rest';
import { useTranslation } from 'react-i18next';
import { Timeline } from 'q3-components';
import Typography from '@material-ui/core/Typography';
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
    versions = [],
  } = useRest({
    url: `history/?collectionName=${collectionName}&documentId=${id}`,
    key: 'versions',
    pluralized: 'versions',
    runOnInit: true,
  });

  return fetchingError ? (
    <Typography>
      {t('failedToLoadVersionHistory')}
    </Typography>
  ) : (
    <Timeline fetching={fetching} entries={versions} />
  );
};

History.propTypes = {};

export default History;
