import React from 'react';
import { browser } from 'q3-ui-helpers';
import IconButton from 'q3-ui/lib/iconButton';

import LockOpen from '@material-ui/icons/LockOpen';
import Lock from '@material-ui/icons/Lock';
import { useToggle } from 'useful-state';

const CellStickyControl = () => {
  const { state, toggle } = useToggle(true);

  const setStickyPreference = () => {
    if (browser.isBrowserReady()) {
      const root = document.querySelector(':root').style;

      root.setProperty(
        '--cell-position',
        state ? 'sticky' : 'static',
      );

      root.setProperty(
        '--cell-header-left',
        state ? '0' : 'auto',
      );
    }
  };

  React.useEffect(() => {
    if (!browser.isBrowserReady()) return undefined;
    window.addEventListener('resize', setStickyPreference);

    return () => {
      window.removeEventListener(
        'resize',
        setStickyPreference,
      );
    };
  }, []);

  React.useLayoutEffect(() => {
    setStickyPreference();
  }, [state]);

  return (
    <IconButton
      id="q3-sticky-header"
      label={state ? 'unstick' : 'stick'}
      icon={state ? Lock : LockOpen}
      buttonProps={{
        size: 'small',
        onClick: toggle,
        style: {
          position: 'absolute',
          top: '50%',
          right: '1rem',
          transform: 'translateY(-50%)',
        },
      }}
    />
  );
};

export default CellStickyControl;
