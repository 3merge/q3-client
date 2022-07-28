import React from 'react';
import PropTypes from 'prop-types';
import DocumentViewerError from '../DocumentViewerError';
import { getFileType } from '../utils';

const ReactFileViewer = React.lazy(() =>
  // issues with react-file-viewer package
  import('react-file-viewer'),
);

/**
 * Sometimes, react-file-viewer unexpectedly crashes.
 * This shouldn't be necessary given the errorComponent prop,
 * but for some reason the error is uncaught.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    // eslint-disable-next-line
    const { children, errorComponent: ErrorComponent } =
      this.props;

    return hasError ? <ErrorComponent /> : children;
  }
}

const DocumentViewerObject = (props) => {
  const { url } = props;
  const FallbackComponent = React.useCallback(
    () => <DocumentViewerError {...props} />,
    [],
  );

  return (
    <ErrorBoundary errorComponent={FallbackComponent}>
      <React.Suspense fallback={<div />}>
        <ReactFileViewer
          errorComponent={FallbackComponent}
          fileType={getFileType(url)}
          filePath={url}
          unsupportedComponent={FallbackComponent}
        />
      </React.Suspense>
    </ErrorBoundary>
  );
};

DocumentViewerObject.propTypes = {
  url: PropTypes.string.isRequired,
};

export default DocumentViewerObject;
