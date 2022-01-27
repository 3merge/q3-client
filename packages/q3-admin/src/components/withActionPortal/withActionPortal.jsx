import React from 'react';
import ReactDOM from 'react-dom';
import { browser } from 'q3-ui-helpers';
import { get } from 'lodash';

const withActionPortal =
  (Component, settings) => (props) => {
    const [anchor, setAnchor] = React.useState();

    React.useLayoutEffect(() => {
      if (browser.isBrowserReady()) {
        const el = document.getElementById(
          get(
            settings,
            'elementId',
            'q3-collection-actions',
          ),
        );

        setAnchor(el);
      }
    }, []);

    return anchor
      ? ReactDOM.createPortal(
          <Component {...props} />,
          anchor,
        )
      : null;
  };

export default withActionPortal;
