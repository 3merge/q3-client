import React from 'react';
import { browser } from 'q3-ui-helpers';
import ReactDOM from 'react-dom';

const ToolbarCollectionPortal = ({ children }) => {
  const [anchor, setAnchor] = React.useState();

  React.useLayoutEffect(() => {
    if (browser.isBrowserReady())
      setAnchor(
        document.getElementById(
          'app-toolbar-collection-actions',
        ),
      );
  }, []);

  return anchor
    ? ReactDOM.createPortal(children, anchor)
    : null;
};

export default ToolbarCollectionPortal;
