import React from 'react';
import PropTypes from 'prop-types';
import DocumentViewerError from '../DocumentViewerError';
import { getFileType } from '../utils';

const ReactFileViewer = React.lazy(() =>
  // issues with react-file-viewer package
  import('react-file-viewer'),
);

const DocumentViewerObject = (props) => {
  const { url } = props;
  const FallbackComponent = React.useCallback(
    () => <DocumentViewerError {...props} />,
    [],
  );

  return (
    <React.Suspense fallback={<div />}>
      <ReactFileViewer
        errorComponent={FallbackComponent}
        fileType={getFileType(url)}
        filePath={url}
        unsupportedComponent={FallbackComponent}
      />
    </React.Suspense>
  );
};

DocumentViewerObject.propTypes = {
  url: PropTypes.string.isRequired,
};

export default DocumentViewerObject;
