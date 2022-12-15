import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line
    console.log('Scanner errored with: ', error, errorInfo);
    const { onError } = this.props;
    onError(error);
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return null;
    }

    return children;
  }
}

export default ErrorBoundary;
