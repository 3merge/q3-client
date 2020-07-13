import React from 'react';
import { browser } from 'q3-ui-helpers';
import IconButton from 'q3-ui/lib/iconButton';
import Hidden from '@material-ui/core/Hidden';
import Fade from '@material-ui/core/Fade';
import LockOpen from '@material-ui/icons/LockOpen';
import Lock from '@material-ui/icons/Lock';
import { useToggle } from 'useful-state';

const CellStickyControl = () => {
  const { state, toggle } = useToggle(true);
  const [show, setShowToggle] = React.useState(false);
  const ref = React.useRef();

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
    if (!browser.isBrowserReady() || !ref.current)
      return undefined;

    const { parentNode } = ref.current.closest('table');
    const resizeObserver = new ResizeObserver(() => {
      const overflow = browser.isOverflownHorizontal(
        ref.current.closest('table').parentNode,
      );

      setShowToggle(overflow);
      setStickyPreference();
    });

    resizeObserver.observe(parentNode);

    return () => {
      resizeObserver.unobserve(parentNode);
    };
  }, []);

  React.useLayoutEffect(() => {
    setStickyPreference();
  }, [state]);

  return (
    <Hidden smDown implementation="css">
      <Fade in={show}>
        <div>
          <IconButton
            id="q3-sticky-header"
            label={state ? 'unstick' : 'stick'}
            icon={state ? Lock : LockOpen}
            buttonProps={{
              size: 'small',
              onClick: toggle,
              ref,
              style: {
                position: 'absolute',
                top: '50%',
                right: '1rem',
                transform: 'translateY(-50%)',
              },
            }}
          />
        </div>
      </Fade>
    </Hidden>
  );
};

export default CellStickyControl;
