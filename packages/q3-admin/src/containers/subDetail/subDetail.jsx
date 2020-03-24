import React from 'react';
import PropTypes from 'prop-types';
import useRest from 'q3-ui-rest';
import { Skeleton } from '@material-ui/lab';
import Repeater from 'q3-ui-repeater';
import Context from '../state';

export const RowSkeleton = () => (
  <Skeleton
    variant="rect"
    height={56}
    width="100%"
    style={{ margin: '0.5rem 0' }}
  />
);

const SubDetail = ({
  root,
  decorators,
  children,
  ...rest
}) => {
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
    <Repeater
      name={root}
      collectionName={collectionName}
      data={subdocumentState[root]}
      edit={subdocumentState.patch}
      create={subdocumentState.post}
      remove={subdocumentState.remove}
      {...subdocumentState}
      {...rest}
    >
      {children}
    </Repeater>
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
