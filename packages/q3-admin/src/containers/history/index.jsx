import React from 'react';
import useRest from 'q3-ui-rest';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Timeline from 'q3-ui/lib/timeline';
import { Definitions } from '../state';
import DisplayHistory from '../../components/display';

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

  return (
    <DisplayHistory
      loading={fetching}
      error={fetchingError}
      errorLabel={t('historyError')}
    >
      <Timeline entries={versions} />
    </DisplayHistory>
  );
};

History.propTypes = {
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default History;
