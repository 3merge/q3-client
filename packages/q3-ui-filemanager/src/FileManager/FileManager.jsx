import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { object } from 'q3-ui-helpers';
import { delay } from 'lodash';
import Container from '@material-ui/core/Container';
import AlertAuthError from '../AlertAuthError';
import AlertFetchingError from '../AlertFetchingError';
import Directory from '../Directory';
import FileManagerAuthContext from '../FileManagerAuthContext';
import FileManagerContext from '../FileManagerContext';
import FileManagerCurrentContext from '../FileManagerCurrentContext';
import useUploads from '../useUploads';
import useUploadsAuth from '../useUploadsAuth';
import useCurrent from '../useCurrent';

const FileManager = ({ collectionName, id, ...rest }) => {
  const [init, setInit] = React.useState(false);
  const auth = useUploadsAuth(collectionName, rest);
  const currentState = useCurrent();

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
    <FileManagerAuthContext.Provider value={auth}>
      <FileManagerContext.Provider value={uploadState}>
        <FileManagerCurrentContext.Provider
          value={currentState}
        >
          <Directory />
        </FileManagerCurrentContext.Provider>
      </FileManagerContext.Provider>
    </FileManagerAuthContext.Provider>
  );
};

FileManager.defaultProps = {
  canCreate: true,
  canDelete: true,
  canEdit: true,
  canSee: true,
  initialView: 'list',
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
  initialView: PropTypes.string,
};

export default FileManager;
