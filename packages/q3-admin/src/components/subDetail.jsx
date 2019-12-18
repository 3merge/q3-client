import React from 'react';
import PropTypes from 'prop-types';
import useRest from 'q3-ui-rest';
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

const SubDetail = ({ name, children }) => {
  const { resourceName, id } = React.useContext(Context);
  const subdocumentState = useRest({
    key: name,
    pluralized: name,
    runOnInit: true,
    url: `/${resourceName}/${id}/${name}`,
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
      data: subdocumentState[name],
      edit: subdocumentState.patch,
      create: subdocumentState.post,
      remove: subdocumentState.remove,
    })
  );
};

SubDetail.propTypes = {
  children: PropTypes.node.isRequired,
  collectionName: PropTypes.string.isRequired,
  resourceName: PropTypes.string.isRequired,
  resourceNameSingular: PropTypes.string.isRequired,
  id: PropTypes.string,
};

SubDetail.defaultProps = {
  id: null,
};

export default SubDetail;
