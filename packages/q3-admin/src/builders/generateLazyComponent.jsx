import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

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

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line
    console.warn(error, errorInfo);
  }

  render() {
    const {
      // eslint-disable-next-line
      props: { children },
      state: { hasError },
    } = this;

    return hasError ? (
      <span>Failed to load dynamic module.</span>
    ) : (
      children
    );
  }
}

export default (statement) => {
  const El = React.lazy(() => statement);

  return (props) => (
    <ErrorBoundary>
      <React.Suspense fallback={<CircularProgress />}>
        <El {...props} />
      </React.Suspense>
    </ErrorBoundary>
  );
};
