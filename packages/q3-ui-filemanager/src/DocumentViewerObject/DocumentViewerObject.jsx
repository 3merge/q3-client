import React from 'react';
import FileViewer from 'react-file-viewer';
import PropTypes from 'prop-types';
import DocumentViewerError from '../DocumentViewerError';
import { getFileType } from '../utils';

const DocumentViewerObject = (props) => {
  const { url } = props;
  const FallbackComponent = React.useCallback(
    () => <DocumentViewerError {...props} />,
    [],
  );

  return (
    <FileViewer
      errorComponent={FallbackComponent}
      fileType={getFileType(url)}
      filePath={url}
      unsupportedComponent={FallbackComponent}
    />
  );
};

DocumentViewerObject.propTypes = {
  url: PropTypes.string.isRequired,
};

export default DocumentViewerObject;
