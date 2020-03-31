import React from 'react';
import useRest from 'q3-ui-rest';
import PropTypes from 'prop-types';

export const getAuthor = (v) => {
  if (!v.createdBy) return null;
  return `${v.createdBy.firstName} ${v.createdBy.lastName}`;
};

const History = ({ collectionName, id }) => {
  const {
    post,
    remove,
    patch,
    fetching,
    fetchingError,
    versions = [],
  } = useRest({
    url: `history/?collectionName=${collectionName}&documentId=${id}`,
    key: 'versions',
    pluralized: 'versions',
    runOnInit: true,
  });

  return null;
};

History.propTypes = {
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default History;
