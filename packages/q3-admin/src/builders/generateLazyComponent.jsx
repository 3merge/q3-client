import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default (statement) => {
  const El = React.lazy(() => statement);

  return (props) => (
    <React.Suspense fallback={<CircularProgress />}>
      <El {...props} />
    </React.Suspense>
  );
};
