import React from 'react';
import EmailEditorErrorGraphic from '../EmailEditorErrorGraphic';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  render() {
    const { hasError } = this.state;
    // eslint-disable-next-line
    const { children } = this.props;

    return hasError ? (
      <EmailEditorErrorGraphic />
    ) : (
      children
    );
  }
}
