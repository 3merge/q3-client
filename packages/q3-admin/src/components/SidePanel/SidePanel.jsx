import React from 'react';
import { compose, isNil } from 'lodash/fp';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
import AppsIcon from '@material-ui/icons/Apps';
import Hidden from '@material-ui/core/Hidden';
import Dialog from 'q3-ui-dialog';
import { SwapHorizontalCircle } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import useGlobalStyle from '../useStyle';
import useStyle from './useStyle';

const SIDE_PANEL_VISIBILITY = 'sidePanelVisibility';

const getItem = () =>
  JSON.parse(localStorage.getItem(SIDE_PANEL_VISIBILITY));

const setItem = (item) =>
  localStorage.setItem(SIDE_PANEL_VISIBILITY, item);

export const toState = (x) => (isNil(x) ? true : x);

const SidePanel = ({ id, children }) => {
  const [state, setState] = React.useState(
    compose(toState, getItem),
  );
  let ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref) {
      ref = true;
    } else {
      setItem(state);
    }
  }, [state]);

  const toggleSidePanel = () => setState((cur) => !cur);

  const globalStyle = useGlobalStyle();
  const cls = useStyle({ state });

  return (
    <div id={id}>
      <Hidden mdDown>
        <Box className={cls.root}>
          <IconButton
            onClick={toggleSidePanel}
            className={cls.drawerBtn}
          >
            <SwapHorizontalCircle />
          </IconButton>
          {state && (
            <Grid
              item
              className={classnames(
                globalStyle.fillViewportHeight,
              )}
            >
              <Box
                component="aside"
                className={cls.scroller}
              >
                {children}
              </Box>
            </Grid>
          )}
        </Box>
      </Hidden>
      <Hidden lgUp>
        <Dialog
          title="options"
          renderContent={() => children}
          renderTrigger={(onClick) => (
            <Box
              color="primary.contrastText"
              position="absolute"
              top="-71px"
              right="141px"
              display="flex"
              alignItems="center"
              height="71px"
              zIndex={1210}
            >
              <IconButton
                label="options"
                icon={AppsIcon}
                buttonProps={{
                  onClick,
                  style: {
                    color: 'inherit',
                  },
                }}
              />
            </Box>
          )}
        />
      </Hidden>
    </div>
  );
};

export default SidePanel;
