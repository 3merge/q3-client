import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { object } from 'q3-ui-helpers';
import { delay } from 'lodash';
import AlertAuthError from '../AlertAuthError';
import AlertFetchingError from '../AlertFetchingError';
import FileManagerAuthContext from '../FileManagerAuthContext';
import FileManagerContext from '../FileManagerContext';
import useUploads from '../useUploads';
import useUploadsAuth from '../useUploadsAuth';

const FileManager = ({ collectionName, id, ...rest }) => {
  const [init, setInit] = React.useState(false);
  const auth = useUploadsAuth(collectionName, rest);
  const { get, fetching, fetchingError, ...uploadState } =
    useUploads(collectionName, id);

  const setInitTruthy = () => setInit(true);

  React.useEffect(() => {
    if (auth.canSee) object.noop(get()).then(setInitTruthy);
    // simulate network delay
    else delay(setInitTruthy, 1000);
  }, []);

  if (!init || fetching) return <CircularProgress />;
  if (!auth.canSee) return <AlertAuthError />;
  if (fetchingError) return <AlertFetchingError />;

  return (
    <FileManagerAuthContext value={auth}>
      <FileManagerContext.Provider value={uploadState}>
        <div>Components</div>
      </FileManagerContext.Provider>
    </FileManagerAuthContext>
  );
};

FileManager.defaultProps = {
  canCreate: true,
  canDelete: true,
  canEdit: true,
  canSee: true,
};

FileManager.propTypes = {
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,

  canCreate: PropTypes.bool,
  canDelete: PropTypes.bool,
  canEdit: PropTypes.bool,
  canSee: PropTypes.bool,
};

export default FileManager;
