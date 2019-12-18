import React from 'react';
import PropTypes from 'prop-types';
import useRest from 'q3-ui-rest';
import prefix from 'prefix-keys';
import { Skeleton } from '@material-ui/lab';
import Context from './state';

const RowSkeleton = () => (
  <Skeleton
    variant="rect"
    height={56}
    width="100%"
    style={{ margin: '0.5rem 0' }}
  />
);

const SubDetail = ({ root, children }) => {
  const {
    resourceName,
    collectionName,
    id,
  } = React.useContext(Context);
  const subdocumentState = useRest({
    key: root,
    pluralized: root,
    runOnInit: true,
    url: `/${resourceName}/${id}/${root}`,
  });

  return subdocumentState.fetching ? (
    <>
      <RowSkeleton />
      <RowSkeleton />
      <RowSkeleton />
      <RowSkeleton />
      <RowSkeleton />
    </>
  ) : (
    React.cloneElement(children, {
      ...subdocumentState,
      data: subdocumentState[root],
      edit: subdocumentState.patch,
      create: subdocumentState.post,
      remove: subdocumentState.remove,
      formPath: root,
      collectionName,
    })
  );
};

SubDetail.propTypes = {
  children: PropTypes.node.isRequired,
  root: PropTypes.string.isRequired,
};

export default SubDetail;
