import React from 'react';
import PropTypes from 'prop-types';
import useRest from 'q3-ui-rest';
import { Skeleton } from '@material-ui/lab';
import Context from './state';

export const RowSkeleton = () => (
  <Skeleton
    variant="rect"
    height={56}
    width="100%"
    style={{ margin: '0.5rem 0' }}
  />
);

const SubDetail = ({ root, decorators, children }) => {
  const { collectionName, id } = React.useContext(Context);

  const subdocumentState = useRest({
    key: root,
    pluralized: root,
    runOnInit: true,
    url: `/${collectionName}/${id}/${root}`,
    decorators,
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
      collectionName,
    })
  );
};

SubDetail.propTypes = {
  children: PropTypes.node.isRequired,
  root: PropTypes.string.isRequired,
  decorators: PropTypes.shape({
    get: PropTypes.func,
    post: PropTypes.func,
    patch: PropTypes.func,
    put: PropTypes.func,
    remove: PropTypes.func,
  }),
};

SubDetail.defaultProps = {
  decorators: {},
};

export default SubDetail;
